import NotePage from '@/app/notes/[id]/page';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ModalNotePage(props: PageProps) {
  return <NotePage {...props} />;
}