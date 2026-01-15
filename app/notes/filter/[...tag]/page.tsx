import { notFound } from 'next/navigation';
import { QueryClient, dehydrate} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';

const ALLOWED_TAGS = ['work', 'personal', 'all'];

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ tag?: string[] }>;
}) {
  const { tag } = await params;
  const tagParam = tag?.[0];

  if (!tagParam || !ALLOWED_TAGS.includes(tagParam)) {
    notFound(); 
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tagParam],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: tagParam === 'all' ? undefined : tagParam,
      }),
  });

  return (
    <NotesClient
      dehydratedState={dehydrate(queryClient)}
      tag={tagParam === 'all' ? undefined : tagParam}
    />
  );
}