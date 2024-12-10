import { PrismaClient } from "@prisma/client";
import { productLists } from "@/store/productLists"; // Make sure this path is correct

const prisma = new PrismaClient();

async function main() {
  // Create some users to associate with reviews
  const users = [
    {
      name: "Ricardo M",
      email: "ricardo@example.com",
      password: "password123",
    },
    { name: "John S", email: "john@example.com", password: "password123" },
    {
      name: "William S",
      email: "william@example.com",
      password: "password123",
    },
  ];

  // Create users in the database, checking for duplicates by email
  const createdUsers = await Promise.all(
    users.map(async (user) => {
      // Check if the user already exists by email
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        return existingUser; // Return existing user if found
      }

      // If the user does not exist, create a new user
      return prisma.user.create({
        data: user,
      });
    })
  );

  // Create products and associate reviews with users
  for (const product of productLists) {
    // Create product
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        sku: product.sku,
        categories: product.categories,
        tags: product.tags,
        hasDiscount: product.hasDiscount,
        sizes: product.sizes,
        price: product.price,
      },
    });

    // Create colors for the product
    for (const color of product.colors) {
      await prisma.colors.create({
        data: {
          name: color.name,
          image: color.image,
          productId: createdProduct.id,
        },
      });
    }

    // Create product images
    for (const [color, images] of Object.entries(product.images)) {
      await prisma.productImages.create({
        data: {
          color,
          url: images,
          productId: createdProduct.id,
        },
      });
    }

    // Create reviews and associate them with users
    for (const review of product.reviews) {
      // Find a random user to assign as the author of the review
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      await prisma.review.create({
        data: {
          name: review.name,
          message: review.message,
          rating: review.rating,
          authorId: randomUser.id, // Link review to user (author)
          productId: createdProduct.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
