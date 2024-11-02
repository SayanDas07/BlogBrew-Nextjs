import BlogOverview from "@/components/blog-overview";

async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get`, {
      method: "GET",
      cache: "no-store",
    });

    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function Blogs() {
  const blogList = await fetchListOfBlogs();

  return <BlogOverview blogList={blogList} />;
}

export default Blogs;