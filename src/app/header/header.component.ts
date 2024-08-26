import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataService,) {}
  userName: string

  get user() {
    const user = this.dataService.getUser()
    if (user) {
      this.userName = user.firstname
      return user.firstname
    } else {
      const user = localStorage.getItem('user')
      if (user) {
        this.userName = JSON.parse(user).user.firstname
        return this.userName
      }
    }
  }

  ngOnInit() {
  }
}
