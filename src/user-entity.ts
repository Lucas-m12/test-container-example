import * as crypto from 'node:crypto';

export class User {
  readonly id: string;

  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    id?: string
  ) {
    this.id = id ? id : this.#generateId();
    this.#validate();
  }

  #validate() {
    if (!this.email.includes('@')) {
      throw new Error('Invalid e-mail');
    }
    if (this.password.length < 6) {
      throw new Error('Password is too short');
    }
    if (this.name.length < 3) {
      throw new Error('Name is too short');
    }
    if (!this.id) {
      throw new Error('Invalid ID');
    }
    return true;
  }

  #generateId() {
    return crypto.randomUUID();
  }
}