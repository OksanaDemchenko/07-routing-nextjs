import Link from 'next/link';

const TAGS = ['Work', 'Personal', 'Todo', 'Meeting', 'Shopping'];

export default function SidebarDefault() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/notes/filter/all">All</Link>
        </li>

        {TAGS.map(tag => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
