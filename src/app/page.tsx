import Link from "next/link";
import { Job } from "@/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch("https://remotive.com/api/remote-jobs?limits=6", {
    cache: 'no-store'
  });
  const data = await res.json();
  const jobs: Job[] = data.jobs.slice(0, 6);

  console.log(jobs)
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-blue-600 py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Find Your Dream Remote Job
        </h1>
        <p className="text-blue-100 text-lg mb-8">
          Browse thousands of remote jobs from top companies worldwide
        </p>
        <div className="flex items-center justify-center gap-3 max-w-xl mx-auto">
          <input
            className="flex-1 border border-blue-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white"
            type="text"
            placeholder="Search jobs, companies..."
          />
          <Link
            href="/jobs"
            className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Search
          </Link>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Featured Jobs</h2>
        <p className="text-gray-500 mb-8">Latest remote opportunities</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((item: Job) => (
            <Link
              href={`/jobs/${item.id}`}
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.company_logo ? (
                  <img src={item.company_logo} alt={item.company_name} className="w-10 h-10 object-contain rounded" />
                ) : (
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600 font-bold text-sm">
                    {item.company_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.company_name}</p>
                  <p className="text-gray-400 text-xs">{item.candidate_region}</p>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex gap-2 flex-wrap mt-3">
                <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{item.job_type}</span>
                <span className="bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full">{item.category}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/jobs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
          >
            Browse All Jobs →
          </Link>
        </div>
      </section>

      <section max-w-6xl mx-auto px-6 py-16>
          <div>
            
          </div>
      </section>
    </main>
  );
}