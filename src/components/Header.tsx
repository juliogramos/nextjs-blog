import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex h-16 items-center justify-between px-8">
        <div>Logo</div>
        <nav className="flex gap-4">
          <Link href="/posts">Posts</Link>
          <Link href="/tags">Tags</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
