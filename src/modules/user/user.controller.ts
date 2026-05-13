import { Request, Response } from "express";
import UserService from "./user.service";

export class UserController {

  static async getAll(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  static async updateRole(req: Request, res: Response) {
    const id = req.params.id;
    const { role } = req.body;

    const user = await UserService.updateRole(id, role);

    res.json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const id = req.params.id;

    await UserService.deleteUser(id);

    res.json({ message: "User deleted" });
  }
}