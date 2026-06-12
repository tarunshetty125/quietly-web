import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentRoutePage } from "@/components/ContentRoutePage";
import { rootContentPages } from "@/lib/quietly-content";

type RootRouteProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return Object.keys(rootContentPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RootRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = rootContentPages[slug];

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | Quietly AI`,
    description: page.summary,
  };
}

export default async function RootContentRoute({ params }: RootRouteProps) {
  const { slug } = await params;
  const page = rootContentPages[slug];

  if (!page) {
    notFound();
  }

  return <ContentRoutePage page={page} />;
}
