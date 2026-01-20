import { notFound } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';

const ALLOWED_SLUGS = ['work', 'personal', 'all'];

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;
  const slugParam = slug?.[0];

  if (!slugParam || !ALLOWED_SLUGS.includes(slugParam)) {
    notFound();
  }

  const tag = slugParam === 'all' ? undefined : slugParam;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag, ''],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag,
        search: undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
