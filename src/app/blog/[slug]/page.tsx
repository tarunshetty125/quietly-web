import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentRoutePage } from "@/components/ContentRoutePage";
import { blogContentPages } from "@/lib/teamsync-content";

type BlogRouteProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return Object.keys(blogContentPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = blogContentPages[slug];

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | TeamSync Blog`,
    description: page.summary,
  };
}

export default async function BlogContentRoute({ params }: BlogRouteProps) {
  const { slug } = await params;
  const page = blogContentPages[slug];

  if (!page) {
    notFound();
  }

  return <ContentRoutePage page={page} />;
}
