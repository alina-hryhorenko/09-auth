import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

const baseUrl = "https://notehub.vercel.app";
const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const selectedTag = slug?.[0] ?? "all";
  const filterName = selectedTag === "all" ? "All notes" : selectedTag;

  const title = `${filterName} | NoteHub`;
  const description = `Browse notes filtered by ${filterName} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/notes/filter/${selectedTag}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const selectedTag = slug?.[0] ?? "all";
  const tag = selectedTag === "all" ? undefined : (selectedTag as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        ...(tag ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
