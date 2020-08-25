import {TagModel} from "./tag.model";

export class UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  valid: boolean;
  ban: boolean;
  prefHome: TagModel[];
}
