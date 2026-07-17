import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  FOUNDER_LINKEDIN,
} from "@/lib/site";
import type { BlogPost } from "./posts";

/** schema.org BlogPosting JSON-LD for a blog post. */
export function blogPostingSchema(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const published = new Date(post.date);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: isNaN(published.getTime())
      ? undefined
      : published.toISOString(),
    image: absoluteUrl("/opengraph-image.png"),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.author,
      url: FOUNDER_LINKEDIN,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-500x500.png"),
      },
    },
  };
}
