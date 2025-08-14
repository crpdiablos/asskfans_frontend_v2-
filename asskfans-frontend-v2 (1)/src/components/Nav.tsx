import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-neutral-800">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-xl">AsskFans</Link>
        <div className="flex gap-4 text-sm text-neutral-300">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </nav>
  )
}
