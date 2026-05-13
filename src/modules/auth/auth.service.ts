import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

  static async register(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        customerCode: Math.random().toString(36).substring(2, 8)
      }
    });

    return user;
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error("Invalid password");

    const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET!,
  { expiresIn: "1d" }
);

    return { token };
  }
}