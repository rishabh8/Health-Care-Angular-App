export class Appointment {
  status: string;
  patientId: number;
  patientFirstName: string;
  patientLastName: string;
  disease: string;
  priority: string;
  tentativedate: string;
  registeredTime: any;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
