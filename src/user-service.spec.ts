import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";
import { PGUserRepository } from "./user-repository";
import { UserService } from "./user-service";
import { createUsersTable } from "./user-service-test-utils";

describe("intergration tests to user service", () => {
  jest.setTimeout(200000);

  let startedContainer: StartedPostgreSqlContainer;
  let pgClient: Client;

  beforeAll(async () => {
    console.time("container-start");
    const container = new PostgreSqlContainer();
    startedContainer = await container.start();
    pgClient = new Client({
      connectionString: startedContainer.getConnectionUri(),
    });
    pgClient.connect();
    await createUsersTable(pgClient);
  });

  afterAll(async () => { 
    await pgClient?.end();
    await startedContainer?.stop();
    console.timeEnd("container-start");
  });

  it("should create an user", async () => {

    console.time("create-user");
    // Arrange
    const createUserDTO = {
      email: "john@example.com.br",
      name: "john doe",
      password: "12345678",
    };
    const userRepository = new PGUserRepository(pgClient);
    const userService = new UserService(userRepository);
    // Act
    await userService.create(createUserDTO);
    // Assert
    const users = await userService.findUsers();
    expect(users.length).toBe(1);
    expect(users[0].email).toBe(createUserDTO.email);
    expect(users[0].name).toBe(createUserDTO.name);
    expect(users[0].password).toBe(createUserDTO.password);
    console.timeEnd("create-user");
  });

});