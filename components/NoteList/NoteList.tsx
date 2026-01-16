import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onViewDetails?: (id: string) => void;
}

export default function NoteList({ notes, onViewDetails }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <button
              className={css.link} 
              onClick={() => onViewDetails?.(note.id)}
            >
              View details
            </button>

            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.status === 'pending'}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
