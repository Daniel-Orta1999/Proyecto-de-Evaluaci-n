import { Gender} from "./Enums";

export interface UserTableUser {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  status: any;
}