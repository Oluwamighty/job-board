import Link from "next/link";
import { Job, JobsResponse } from "@/types";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

export const dynamic = 'force-dynamic';

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; type?: string }>;
}) {
  const {search = "", category="all", type="all"} = await searchParams;

  const res = await fetch("https://remotive.com/api/remote-jobs", {
    cache: 'no-store'
  });
  const data: JobsResponse = await res.json();
  let jobs: Job[] = data.jobs;


  // Filter by search term
  if (search) {
    jobs = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category
  if (category !== "all") {
    jobs = jobs.filter(job =>
      job.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by job type
  if (type !== "all") {
    jobs = jobs.filter(job =>
      job.job_type.toLowerCase() === type.toLowerCase()
    );
  }

  return (
    <main className="max-w-6xl mx-auto  py-10 px-6 lg:px-0">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Browse Jobs</h1>
      <p className="text-blue-900 mb-8">{jobs.length} jobs found</p>

      {/* SearchBar and FilterBar will go here */}
        <SearchBar />
        <FilterBar />
      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {jobs.map((job: Job) => (
          <Link
            href={`/jobs/${job.id}`}
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              {job.company_logo ? (
                <img src={job.company_logo} alt={job.company_name} className="w-10 h-10 object-contain rounded" />
              ) : (
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold text-sm">
                  {job.company_name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 text-sm">{job.company_name}</p>
                <p className="text-gray-400 text-xs">{job.candidate_region}</p>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{job.title}</h3>
            <div className="flex gap-2 flex-wrap mt-3">
              <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{job.job_type}</span>
              <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full">{job.category}</span>
            </div>
          </Link>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No jobs found matching your search.</p>
          <Link href="/jobs" className="text-blue-600 hover:underline mt-2 inline-block">
            Clear filters
          </Link>
        </div>
      )}
    </main>
  );
}