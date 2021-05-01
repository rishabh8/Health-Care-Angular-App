export class Users {
  userId: number;
  username: string;
  mobile: string;
  email: string;
  location: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}

