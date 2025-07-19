import type { NextApiRequest, NextApiResponse } from "next";

interface CreatePostRequest {
  title: string;
  content: string;
  author?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { title, content, author }: CreatePostRequest = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      // For now, just return a mock post to test the frontend
      const post = {
        id: Math.floor(Math.random() * 1000),
        title: title.trim(),
        content: content.trim(),
        author: author || "Anonymous",
        createdAt: new Date().toISOString(),
      };

      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
  }
}
