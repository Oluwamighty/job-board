import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl text-blue-600">
          Job<span className="text-gray-900">Board</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
            Browse Jobs
          </Link>
          <Link
            href="/post-job"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}