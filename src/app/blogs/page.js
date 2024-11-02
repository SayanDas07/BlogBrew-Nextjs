"use client";

import { useEffect, useState } from "react";
import BlogOverview from "@/components/blog-overview";

function Blogs() {
  const [blogList, setBlogList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListOfBlogs() {
      try {
        const apiResponse = await fetch(`/api/get`, {
          method: "GET",
          cache: "no-store",
        });

        if (!apiResponse.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const result = await apiResponse.json();
        setBlogList(result?.data || []);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchListOfBlogs();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <BlogOverview blogList={blogList} />;
}

export default Blogs;
