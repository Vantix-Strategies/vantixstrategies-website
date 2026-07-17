import { Fragment } from "react";
import type { FC } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Lightweight, theme-consistent concept diagrams for the phase pages. Pure
// presentational (no hooks) — a horizontal flow on desktop that stacks
// vertically on mobile, so nothing overflows on small screens.

interface FlowNodeData {
  label: string;
  sub?: string;
  accent?: boolean;
}

function FlowNode({ label, sub, accent }: FlowNodeData) {
  return (
    <div
      className={cn(
        "flex-1 min-w-0 border p-3 text-center",
        accent ? "border-zinc-500 bg-zinc-800/40" : "border-zinc-800 bg-[#111114]",
      )}
    >
      <p className="text-[11px] text-zinc-200 font-mono leading-snug break-words">{label}</p>
      {sub && <p className="text-[10px] text-zinc-500 font-light mt-1 leading-snug">{sub}</p>}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-zinc-600 shrink-0 py-1.5 md:py-0 md:px-1.5">
      <ArrowDown className="w-4 h-4 md:hidden" />
      <ArrowRight className="w-4 h-4 hidden md:block" />
    </div>
  );
}

function Flow({ nodes }: { nodes: FlowNodeData[] }) {
  return (
    <div className="flex flex-col md:flex-row md:items-stretch">
      {nodes.map((n, i) => (
        <Fragment key={i}>
          <FlowNode {...n} />
          {i < nodes.length - 1 && <Connector />}
        </Fragment>
      ))}
    </div>
  );
}

function DiagramFrame({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="border border-zinc-800 bg-[#0a0a0c] p-5 my-6">
      <figcaption className="text-[10px] font-mono tracking-[0.18em] uppercase text-zinc-600 mb-4">
        {title}
      </figcaption>
      {children}
      {caption && (
        <p className="text-[11px] text-zinc-600 font-light mt-4 leading-relaxed">{caption}</p>
      )}
    </figure>
  );
}

function LaneLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-zinc-500 mb-2">
      {children}
    </p>
  );
}

// ── Phase 0 · Workload Identity Federation ──────────────────────────────────
const WifDiagram: FC = () => (
  <DiagramFrame
    title="Keyless deploy · Workload Identity Federation"
    caption="No key is ever stored. GitHub proves its identity on each run; GCP trusts that short-lived token and lets only your one repo impersonate the deploy account."
  >
    <Flow
      nodes={[
        { label: "GitHub Actions", sub: "your repo, on merge" },
        { label: "OIDC token", sub: "short-lived, per run" },
        { label: "WIF pool + provider", sub: "trusts GitHub · scoped to your repo" },
        { label: "Deploy service account", sub: "least-privilege, impersonated" },
        { label: "Cloud Run", sub: "site deploys", accent: true },
      ]}
    />
  </DiagramFrame>
);

// ── Phase 1 · The pull-request loop ─────────────────────────────────────────
const PrFlowDiagram: FC = () => (
  <DiagramFrame
    title="The pull-request loop"
    caption="Nothing reaches main except through a reviewed pull request — and merging is the moment deployment kicks off."
  >
    <Flow
      nodes={[
        { label: "Branch", sub: "off main" },
        { label: "Commit", sub: "small snapshots" },
        { label: "Pull request", sub: "propose the merge" },
        { label: "Review", sub: "read the diff" },
        { label: "Merge → deploy", sub: "to Cloud Run", accent: true },
      ]}
    />
  </DiagramFrame>
);

// ── Phase 2 · Where an LLM call lives ───────────────────────────────────────
const LlmFlowDiagram: FC = () => (
  <DiagramFrame
    title="Where an LLM call lives"
    caption="The browser never talks to the model directly. Credentials stay server-side; only your backend calls Vertex AI, and the answer returns back along the same path."
  >
    <Flow
      nodes={[
        { label: "Browser", sub: "user types a question" },
        { label: "Your backend", sub: "/api/ask · server-side only", accent: true },
        { label: "Vertex AI", sub: "Gemini generates" },
      ]}
    />
  </DiagramFrame>
);

// ── Phase 3 · Retrieve, then generate ───────────────────────────────────────
const RagFlowDiagram: FC = () => (
  <DiagramFrame
    title="Retrieve, then generate"
    caption="Store your documents as embeddings once. For each question, retrieve the closest chunks and let the model answer grounded in just those — with a citation back to the source."
  >
    <LaneLabel>Ingest · once</LaneLabel>
    <Flow
      nodes={[
        { label: "Documents", sub: "resume, writing, projects" },
        { label: "Chunk", sub: "overlapping passages" },
        { label: "Embed", sub: "Vertex AI" },
        { label: "Postgres + pgvector", sub: "stored with source", accent: true },
      ]}
    />
    <div className="mt-5">
      <LaneLabel>Answer a question</LaneLabel>
      <Flow
        nodes={[
          { label: "Question", sub: "from the visitor" },
          { label: "Embed", sub: "same model" },
          { label: "Similarity search", sub: "top matching chunks" },
          { label: "Gemini", sub: "chunks + question" },
          { label: "Answer + citation", sub: "grounded", accent: true },
        ]}
      />
    </div>
  </DiagramFrame>
);

// ── Phase 4 · OAuth-protected MCP tool call ─────────────────────────────────
const McpOauthDiagram: FC = () => (
  <DiagramFrame
    title="OAuth-protected MCP tool call"
    caption="Every tool call must carry a valid, short-lived token. The moment your server can change your site, OAuth verifies who's calling — with no password or long-lived token pasted into Claude."
  >
    <Flow
      nodes={[
        { label: "1 · Claude calls server", sub: "unauthenticated → 401" },
        { label: "2 · You sign in", sub: "provider · OAuth 2.1 + PKCE" },
        { label: "3 · Short-lived token", sub: "issued to Claude" },
        { label: "4 · Tool call + token", sub: "server validates → DB", accent: true },
      ]}
    />
  </DiagramFrame>
);

const DIAGRAMS: Record<string, FC> = {
  wif: WifDiagram,
  "pr-flow": PrFlowDiagram,
  "llm-flow": LlmFlowDiagram,
  "rag-flow": RagFlowDiagram,
  "mcp-oauth": McpOauthDiagram,
};

export function PhaseDiagram({ name }: { name: string }) {
  const Diagram = DIAGRAMS[name];
  return Diagram ? <Diagram /> : null;
}
