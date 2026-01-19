'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

type Note = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  note: Note;
};

export default function NoteModalClient({ note }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.push('/notes')}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
}
