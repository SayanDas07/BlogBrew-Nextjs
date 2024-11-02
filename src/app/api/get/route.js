import { connect } from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

await connect();
export async function GET() {
  try {

    const extractAllBlogsFromDatabase = await Blog.find({});

    if (extractAllBlogsFromDatabase) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogsFromDatabase,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}