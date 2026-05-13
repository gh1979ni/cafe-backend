import { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {

  static async register(
    req: Request,
    res: Response
  ) {

    try {

      const { email, password } = req.body;

      const existingUser =
        await prisma.user.findUnique({
          where: { email }
        });

      if (existingUser) {

        return res.status(400).json({
          message: "User already exists"
        });

      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "admin"
        }
      });

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message: "Register failed"
      });

    }

  }

  static async login(
    req: Request,
    res: Response
  ) {

    try {

      const { email, password } = req.body;

      const user =
        await prisma.user.findUnique({
          where: { email }
        });

      if (!user) {

        return res.status(400).json({
          message: "Invalid credentials"
        });

      }

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {

        return res.status(400).json({
          message: "Invalid credentials"
        });

      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d"
        }
      );

      res.json({
        token,
        user
      });

    } catch (error) {

      res.status(500).json({
        message: "Login failed"
      });

    }

  }

}