import React, { useState, useEffect } from "react";

const JobBoard = () => {
  const [jobIDs, setJobIDs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);
  const [isLimitReached, setLimitReached] = useState(false);

  useEffect(() => {
    const fetchJobIDs = async () => {
      try {
        const response = await fetch(
          "https://hacker-news.firebaseio.com/v0/askstories.json"
        );
        if (!response.ok) {
          throw new Error(`Error fetching job IDs: ${response.statusText}`);
        }
        const result = await response.json();
        setJobIDs(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobIDs();
  }, []);

  useEffect(() => {
    if (jobIDs.length === 0) return;

    fetchJobs(9);
  }, [jobIDs]);

  const fetchJobs = async (limit) => {
    console.log(jobIDs.length);
    if (start + limit >= jobIDs.length) {
      alert("limiit");
      setLimitReached(true);
      return null;
    }
    try {
      console.log(start, start + limit);

      setIsLoading(true);
      const fetchPromises = jobIDs.slice(start, start + limit).map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (response) => {
            if (!response.ok) {
              throw new Error(
                `Error fetching job ${id}: ${response.statusText}`
              );
            }
            return response.json();
          }
        )
      );
      const jobData = await Promise.all(fetchPromises);
      setJobs((prev) => [...prev, ...jobData]);
      setStart((prev) => prev + limit);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Job Board</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>{job.title || "No title available"}</li>
        ))}
      </ul>
      {jobs.length !== 0 && (
        <button disabled={isLimitReached} onClick={() => fetchJobs(6)}>
          Load more
        </button>
      )}
      {isLimitReached && <p>You got all the posts</p>}
    </div>
  );
};

export default JobBoard;
