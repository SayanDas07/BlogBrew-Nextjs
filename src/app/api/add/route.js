import { connect } from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

await connect();

export async function POST(req) {
  try {
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    if (!title || typeof title !== "string" || !description || typeof description !== "string") {
      return NextResponse.json({
        success: false,
        message: "Title and description are required and should be strings",
      });
    }

    const newlyCreatedBlogItem = await Blog.create(extractBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}
