'use client';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  return <p>Note preview: {id}</p>;
}
