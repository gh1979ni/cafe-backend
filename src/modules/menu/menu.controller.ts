import { Request, Response } from "express";
import { MenuService } from "./menu.service";

export class MenuController {

  static async create(req: Request, res: Response) {
    const item = await MenuService.createItem(req.body);
    res.json(item);
  }

  static async getAll(req: Request, res: Response) {
    const items = await MenuService.getAllItems();
    res.json(items);
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const item = await MenuService.updateItem(id, req.body);
    res.json(item);
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    await MenuService.deleteItem(id);
    res.json({ message: "Deleted" });
  }
}