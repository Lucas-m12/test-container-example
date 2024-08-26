import type { Request, Response } from "express";
import type { UserService } from "./user-service";

export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  async index(_: Request, res: Response) {
    try {
      const users = await this.userService.findUsers();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }

  async create(req: Request, res: Response) {
    const body = req.body;
    await this.userService.create(body);
    return res.status(201);
  }
}