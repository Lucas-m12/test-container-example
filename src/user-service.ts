import type { CreateUserDTO } from "./create-user.dto";
import { User } from "./user-entity";
import type { UserRepository } from "./user-repository";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async create(createUserDTO: CreateUserDTO) {
    const { email, name, password } = createUserDTO;
    const user = new User(name, email, password);
    await this.userRepository.create(user);
  };

  async findUsers() {
    return this.userRepository.findAll();
  }
}