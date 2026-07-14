export interface Job {
    id: number;
    title: string;
    company_name: string;
    category: string;
    job_type: string;
    publication_date: string;
    candidate_region: string;
    description: string;
    url: string;
    company_logo: string;
}

export interface JobsResponse {
    jobs: Job[];
}

