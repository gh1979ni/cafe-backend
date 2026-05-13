import { prisma } from "../../config/db";

export class ReviewService {

  static async create(userId: string, menuItemId: string, rating: number, comment: string) {
    return prisma.review.create({
      data: {
        userId,
        menuItemId,
        rating,
        comment
      }
    });
  }

  static async getByMenuItem(menuItemId: string) {
    return prisma.review.findMany({
      where: { menuItemId },
      include: { user: true }
    });
  }
}