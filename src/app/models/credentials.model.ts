export class Credentials {
  userId: number;
  username: string;
  password: string;
  isLoggedIn: boolean;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
