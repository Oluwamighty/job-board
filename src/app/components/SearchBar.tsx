'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

//   Update debouncedSearch 500ms after user stops typing
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedSearch(search);
        }, 500);

        // cleanup - cancel the timer if user types again before 500ms
        return ()=> clearTimeout(timer);
    }, [search]);

    // update URL when debouncedSearch changes
    useEffect(()=>{
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
          params.set("search", debouncedSearch);
        } else {
          params.delete("search");
        }
        router.push(`/jobs?${params.toString()}`);
      },[debouncedSearch])

  return (
    <form onSubmit={(e)=>e.preventDefault()} className="flex gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search jobs or companies..."
        className="flex-1 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors text-sm font-medium"
      >
        Search
      </button>
    </form>
  );
}