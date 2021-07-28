export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  mobile: number;
  email: string;
  description?: string;
  registeredTime: Date;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
