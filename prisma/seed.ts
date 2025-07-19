import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing posts
  await prisma.post.deleteMany();

  // Create demo posts
  const post1 = await prisma.post.create({
    data: {
      title: "Welcome to My Blog!",
      content: `# Welcome to My Blog!

This is my first blog post built with Next.js, Material UI, and Prisma. I'm excited to share my thoughts and experiences with you.

## What to Expect

On this blog, you'll find:
- Technical tutorials and tips
- Personal reflections on software development
- Reviews of tools and technologies
- And much more!

Thanks for visiting, and I hope you enjoy reading my content as much as I enjoy creating it.`,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Building Modern Web Applications",
      content: `# Building Modern Web Applications

In today's fast-paced development world, choosing the right tech stack is crucial for success. Let me share some insights on modern web development.

## The Tech Stack

For this blog, I chose:
- **Next.js**: A powerful React framework with excellent performance
- **Material UI**: Beautiful, accessible components out of the box
- **Prisma**: Type-safe database access with excellent developer experience
- **SQLite**: Simple, reliable database perfect for small to medium applications

## Why This Combination Works

This stack provides an excellent balance of developer experience, performance, and maintainability. Next.js handles routing and SSR, Material UI ensures consistent design, Prisma makes database operations safe and easy, and SQLite keeps things simple.

## Getting Started

The beauty of this setup is how quickly you can get started. With just a few commands, you have a fully functional blog with a database, beautiful UI, and server-side rendering.

Happy coding!`,
    },
  });

  console.log("Database seeded successfully!");
  console.log("Created posts:", { post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
