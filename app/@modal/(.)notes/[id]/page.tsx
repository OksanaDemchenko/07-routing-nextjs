import { fetchNoteById } from '@/lib/api';
import NoteModalClient from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NoteModalClient note={note} />;
}
