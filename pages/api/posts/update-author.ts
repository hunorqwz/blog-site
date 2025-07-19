import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { oldAuthor, newAuthor } = req.body;

    if (!newAuthor || typeof newAuthor !== "string") {
      return res.status(400).json({ error: "New author name is required" });
    }

    // Update all posts by the old author to have the new author name
    const result = await prisma.post.updateMany({
      where: {
        author: oldAuthor || "Anonymous",
      },
      data: {
        author: newAuthor,
      },
    });

    res.status(200).json({
      message: "Posts updated successfully",
      updatedCount: result.count,
    });
  } catch (error) {
    console.error("Error updating posts author:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
