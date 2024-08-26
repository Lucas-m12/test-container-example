import express from "express";
import { sql } from "./src/db";
import { UserController } from "./src/user-controller";
import { PGUserRepository } from "./src/user-repository";
import { UserService } from "./src/user-service";

const server = express();

server.use(express.json());

const userRepository = new PGUserRepository(sql);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

server.get('/users', userController.index);

server.post('/users', userController.create);

server.listen(3000, () => console.log('Server running on port 3000'));