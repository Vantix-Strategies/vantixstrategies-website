import type { Metadata } from "next";
import { BenchmarkPostContent } from "../page";
import { blogPosts } from "../posts";
import { blogPostingSchema } from "../schema";
import { JsonLd } from "@/components/JsonLd";

const post = blogPosts.find((p) => p.slug === "industry-metrics-we-evaluated")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    title: post.title,
    description: post.excerpt,
    type: "article",
    url: `/blog/${post.slug}`,
    images: ["/opengraph-image.png"],
    publishedTime: new Date(post.date).toISOString(),
    authors: [post.author],
  },
};

export default function IndustryMetricsPostPage() {
  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <BenchmarkPostContent />
    </>
  );
}
