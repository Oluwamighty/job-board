'use client';
import { useState } from "react";
// Job Title
// Company Name
// Category (dropdown)
// Job Type (dropdown — full time, contract, part time)
// Location / Region
// Job Description (textarea)
// Application URL

export default function PostJob(){
    const [postJob, setPostJob] = useState({
        job_title: "",
        company_name: "",
        category: "All categories",
        job_type: "",
        location: "",
        job_description: "",
        app_url: ""
    })
    const [error, setError] = useState({
        job_title_Error: "",
        company_name_Error: "",
        category_Error: "",
        job_type_Error: "",
        location_Error: "",
        job_description_Error: "",
        app_url_Error: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPostJob({ ...postJob, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        let hasError = false;
        const formError = {
            job_title_Error: "",
            company_name_Error: "",
            category_Error: "",
            job_type_Error: "",
            location_Error: "",
            job_description_Error: "",
            app_url_Error: ""
        }

            if(postJob.job_title === ""){
                formError.job_title_Error = "Job title is required"
                hasError = true;
            }
            if(postJob.job_type === ""){
                formError.job_type_Error = "Type of job required"
                hasError = true;
            }
            if(postJob.job_description === ""){
                formError.job_description_Error = "Job Description Required"
                hasError = true;
            }
            if(postJob.company_name === ""){
                formError.company_name_Error = "Company Name required"
                hasError = true;
            }
            if (postJob.location === ""){
                formError.location_Error = "Location required"
                hasError = true;
            }
            if(postJob.app_url === ""){
                formError.app_url_Error = "URL required"
                hasError = true;
            }
            if (postJob.category === "All categories"){
                formError.category_Error = "Select Category"
                hasError = true;
            }
        
            setError(formError)
        if(hasError) return;
        
        alert("Job Submitted successfully" + postJob.job_title + postJob.company_name )
    }
    return (
        <main className="flex justify-center items-center flex-col w-full py-8 px-10">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl">Job Post Creation</h1>
                <p className="text-center">Fill in the form below to submit your job vacancy</p>
            </div>
            <div className="w-full lg:w-[50%]">
                <form onSubmit={handleSubmit} action="" className=" bg-blue-700 p-7 rounded-2xl">
                    <div className="flex flex-col gap-7">
                        <input type="text"
                        id="job-title"
                        name="job_title"
                        value={postJob.job_title}
                        onChange={handleChange}
                        placeholder="Enter your job title..."
                        className="w-full bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        />
                        <p className="text-red-600">{error.job_title_Error}</p>

                        <input type="text"
                        id="company-name"
                        name="company_name"
                        value={postJob.company_name}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                        className="w-full bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        />
                        <p className="text-red-600">{error.company_name_Error}</p>

                        <select name="category" 
                        value={postJob.category} 
                        id="category" 
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2">
                            <option value="">All categories</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Customer Service">Customer Service</option>
                            <option value="Sales">Sales</option>
                            <option value="Writing">Writing</option>
                            <option value="DevOps/SysAdmin">DevOps/SysAdmin</option>
                        </select>
                        <p className="text-red-600">{error.category_Error}</p>

                        <input type="text"
                        id="job_type"
                        name="job_type"
                        value={postJob.job_type}
                        onChange={handleChange}
                        placeholder="Enter job type e.g Fulltime / Part Time"
                        className="w-full bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        />
                        <p className="text-red-600">{error.job_type_Error}</p>

                        <input type="text"
                        id="job_type"
                        name="location"
                        value={postJob.location}
                        onChange={handleChange}
                        placeholder="Enter job location"
                        className="w-full bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        />
                        <p className="text-red-600">{error.location_Error}</p> 

                        <input type="text"
                        id="url"
                        name="app_url"
                        value={postJob.app_url}
                        onChange={handleChange}
                        placeholder="Enter your application URL"
                        className="w-full bg-gray-900 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        />
                        <p className="text-red-600">{error.app_url_Error}</p>

                        <textarea 
                        name="job_description" 
                        value={postJob.job_description} 
                        id="description"
                        onChange={handleChange}
                        className="w-full bg-gray-900 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                        placeholder="What is the job description?">
                        
                        </textarea>
                        <p className="text-red-600">{error.job_description_Error}</p>

                        <button type="submit" className="flex text-white bg-blue-950 w-30 text-center justify-center items-center py-3 rounded-2xl hover:bg-blue-300 hover:text-green-900 cursor-pointer"> Post Job </button>
                    </div>
                </form>
            </div>
        </main>
    )
}