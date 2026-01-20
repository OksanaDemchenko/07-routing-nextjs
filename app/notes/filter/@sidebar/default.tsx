import Link from 'next/link';

export default function SidebarDefault() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link href="/notes/filter/all">All</Link>
          </li>
          <li>
            <Link href="/notes/filter/work">Work</Link>
          </li>
          <li>
            <Link href="/notes/filter/personal">Personal</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
