import { notFound } from 'next/navigation';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';

const ALLOWED_SLUGS = ['work', 'personal', 'all'];

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugParam = slug?.[0];

  // Якщо slug не дозволений або пустий — 404
  if (!slugParam || !ALLOWED_SLUGS.includes(slugParam)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, slugParam],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: slugParam === 'all' ? undefined : slugParam,
      }),
  });

  return (
    <NotesClient
      dehydratedState={dehydrate(queryClient)}
      tag={slugParam === 'all' ? undefined : slugParam}
    />
  );
}
