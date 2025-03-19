import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        // Get the absolute path to the public directory
        const publicDirectory = path.join(process.cwd(), "public");

        // Read files from public directory
        const files = fs.readdirSync(publicDirectory);

        // Filter for image files
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg", ".JPG", ".JPEG", ".PNG"];
        const imageFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext) || imageExtensions.includes(ext.toUpperCase());
        });

        // Create URLs for the images
        const imageUrls = imageFiles.map((file) => `/${file}`);

        // Return the list of image URLs
        return NextResponse.json({ images: imageUrls });
    } catch (error) {
        console.error("Error reading public directory:", error);
        return NextResponse.json({ error: "Failed to read image directory" }, { status: 500 });
    }
}
