import { User } from './user-entity';

describe('unit tests to user entity', () => {
  it('should create an instance', () => {
    const user = new User('John Doe', 'john@example.com.br', '123456');
    expect(user).toBeTruthy();
  });

  it('should throw an error when the email is invalid', () => {
    expect(
      () => new User('John Doe', 'johnexample.com.br', '123456')
    ).toThrowError('Invalid e-mail');
  });

  it('should throw an error when the password is invalid', () => {
    expect(
      () => new User('John Doe', 'john@example.com.br', '123')
    ).toThrowError('Password is too short');
  });

  it('should throw an error when the name is invalid', () => {
    expect(
      () => new User('Jo', 'john@example.com.br', '123456')
    ).toThrowError('Name is too short');
  });

  it('should generate an id', () => {
    const user = new User('John Doe', 'john@example.com.br', '123456');
    expect(user.id).toBeDefined();
  });

  it('should receive an id', () => {
    const user = new User('John Doe', 'john@example.com.br', '123456', '123');
    expect(user.id).toBe('123');
  });

});