import {UserModel} from "./user.model";

export class RegisterDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class LoginDTO {
  email: string;
  password: string;
}

export class VerificationToken {
  id: number;
  token: string;
  user: UserModel;
  expiryDate: Date;
}
