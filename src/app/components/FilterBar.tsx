'use client'
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "all",
  "Software Development",
  "Design",
  "Marketing",
  "Customer Service",
  "Sales",
  "Writing",
  "DevOps / Sysadmin",
];

const jobTypes = [
  { value: "all", label: "All Types" },
  { value: "full_time", label: "Full Time" },
  { value: "contract", label: "Contract" },
  { value: "part_time", label: "Part Time" },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  const currentType = searchParams.get("type") || "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {/* Category Filter */}
      <select
        value={currentCategory}
        onChange={(e) => updateFilter("category", e.target.value)}
        className="border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All Categories" : cat}
          </option>
        ))}
      </select>

      {/* Job Type Filter */}
      <select
        value={currentType}
        onChange={(e) => updateFilter("type", e.target.value)}
        className="border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      >
        {jobTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      {(currentCategory !== "all" || currentType !== "all") && (
        <button
          onClick={() => router.push("/jobs")}
          className="text-red-500 hover:text-red-700 text-sm transition-colors"
        >
          ✕ Clear filters
        </button>
      )}
    </div>
  );
}