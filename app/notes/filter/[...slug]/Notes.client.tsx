'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes, FetchNotesResponse } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from './NotesPage.module.css';

const PER_PAGE = 12;

interface NotesClientProps {
  initialNotes?: FetchNotesResponse['notes'];
  tag?: string;
}

export default function NotesClient({
  initialNotes = [],
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, tag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        tag,
        search: debouncedSearch,
      }),
    placeholderData: {
      notes: initialNotes,
      totalPages: 1,
    },
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isFetching ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        <NoteList notes={notes} />
      )}

      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <NoteForm onCancel={() => setIsCreateModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
