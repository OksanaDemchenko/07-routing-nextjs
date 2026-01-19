import { notFound } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const ALLOWED_SLUGS = ['work', 'personal', 'all'];

export default async function NotesFilterPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugParam = slug?.[0];

  if (!slugParam || !ALLOWED_SLUGS.includes(slugParam)) {
    notFound();
  }

  const data = await fetchNotes({
    page: 1,
    perPage: 12,
    search: slugParam === 'all' ? undefined : slugParam,
  });

  return (
    <NotesClient
      initialNotes={data.notes}
      tag={slugParam === 'all' ? undefined : slugParam}
    />
  );
}
