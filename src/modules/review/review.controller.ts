import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { AuthRequest } from "../../middleware/auth.middleware";

export class ReviewController {

  static async create(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    const { menuItemId, rating, comment } = req.body;

    const review = await ReviewService.create(
      userId!,
      menuItemId,
      rating,
      comment
    );

    res.json(review);
  }

static async getByMenuItem(req: Request, res: Response) {
  const menuItemId = req.params.menuItemId as string;

  const reviews = await ReviewService.getByMenuItem(menuItemId);

  res.json(reviews);
}
}