import { Injectable } from "@angular/core";
import { User } from "../shared/user";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  email: string;
  user: User;

  setUserEmail(email: string) {
    this.email = email;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User | undefined {
    return this.user
  }
}
