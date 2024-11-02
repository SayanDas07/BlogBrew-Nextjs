import { connect } from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

await connect();
export async function PUT(req) {
    try {

        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get("id");

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: "Blog ID is required",
            });
        }

        const { title, description } = await req.json();

        if (!title || typeof title !== "string" || !description || typeof description !== "string") {
            return NextResponse.json({
                success: false,
                message: "Title and description are required and should be strings",
            });
        }

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message,
            });
        }

        const updateBlogByBlogID = await Blog.findOneAndUpdate(
            {
                _id: getCurrentBlogID,
            },
            { title, description },
            { new: true }
        );

        if (updateBlogByBlogID) {
            return NextResponse.json({
                success: true,
                message: "Blog is updated successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong ! Please try again",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again",
        });
    }
}