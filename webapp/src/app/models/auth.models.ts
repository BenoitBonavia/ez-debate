import {UserModel} from "./user.model";

export class RegisterDTO {
  email: string;
  firstname: string;
  lastname: string;
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
