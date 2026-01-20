'use client';

import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['work', 'personal'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>
     {tags.map(tag => (
  <li key={tag}>
    <Link href={`/notes/filter/${tag}`}>
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </Link>
  </li>
))}

     
    </ul>
  );
}
