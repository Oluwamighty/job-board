import Link from "next/link";
import { Job, JobsResponse } from "@/types";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // fetch all jobs and find the matching one
  const res = await fetch("https://remotive.com/api/remote-jobs", {
    cache: 'no-store'
  });
  const data: JobsResponse = await res.json();
  const job: Job | undefined = data.jobs.find(j => j.id === Number(id));

  if (!job) return (
    <div className="p-8 text-center">
      <p className="text-gray-500 text-lg">Job not found.</p>
      <Link href="/jobs" className="text-blue-600 hover:underline mt-2 inline-block">
        ← Back to Jobs
      </Link>
    </div>
  );

  return (
    <main className="flex flex-col relative w-full gap-4 max-w-6xl mx-auto px-3 py-10 sm:flex-row">
      <Link href="/jobs" className="flex absolute top-0 left-0 text-blue-600 w-40 hover:underline text-5 mb-6 mt-2 ">
        ← Back to Jobs
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
        <div className="flex flex-col items-center gap-4 mb-6">
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 object-contain rounded-lg border border-gray-100 p-1" />
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
              {job.company_name?.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-500">{job.company_name}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">{job.job_type}</span>
          <span className="bg-purple-50 text-purple-600 text-sm px-3 py-1 rounded-full">{job.category}</span>
          <span className="bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full">🌍 {job.candidate_region}</span>
          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
            📅 {new Date(job.publication_date).toLocaleDateString()}
          </span>
        </div>

        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-block font-medium"
        >
          Apply  →
        </a>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
        <div
          className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>
    </main>
  );
}