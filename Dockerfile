# Multi-stage build for Next.js standalone output, deployed to Cloud Run.
# Terraform owns the deploy (infra/terraform/cloud_run.tf); cloudbuild.yaml only
# builds and pushes this image.

# ---- deps ----------------------------------------------------------------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder -------------------------------------------------------------
FROM node:24-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* values are inlined into the client bundle at BUILD time, so the
# canonical site URL has to be known here. Setting it as a Cloud Run env var
# instead would be a silent no-op for anything rendered in the browser.
# Cloud Build passes this through as _SITE_URL.
ARG NEXT_PUBLIC_SITE_URL=https://www.vantixstrategies.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner --------------------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app

# Baked in again so server-rendered reads of process.env.NEXT_PUBLIC_SITE_URL
# match what was inlined into the client bundle — a mismatch shows up as a
# hydration error, not a build failure.
ARG NEXT_PUBLIC_SITE_URL=https://www.vantixstrategies.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ENV NODE_ENV=production
# Cloud Run routes traffic to $PORT and the standalone server binds to localhost
# unless HOSTNAME is set — without HOSTNAME the container starts but fails every
# health check. Keep PORT in sync with container_port in cloud_run.tf.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]
