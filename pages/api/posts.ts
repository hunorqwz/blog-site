import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

interface CreatePostRequest {
  title: string;
  content: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { title, content }: CreatePostRequest = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      const post = await prisma.post.create({
        data: {
          title: title.trim(),
          content: content.trim(),
        },
      });

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
