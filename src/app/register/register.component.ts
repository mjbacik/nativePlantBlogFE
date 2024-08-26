import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "../services/user.service";
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dataService: DataService,
    private router: Router,
  ) {}

  registerForm!: FormGroup;
  restaurantInfo: { name: string; email: string; address: string };
  toasts: any[] = [];

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
    });
    this.registerForm.patchValue({ email: this.dataService.email });
  }

  submit(info) {
    try {
      this.userService
        .createUser(info.email, info.password, info.firstName)
        .subscribe((user) => {
          const now = new Date();
          this.dataService.setUser(user);
          localStorage.setItem(
            "user",
            JSON.stringify({
              user,
              expiry: now.getTime() + 1000000,
            }),
          );
          this.router.navigate([`/dashboard`]);
        }),
        (err) => {
          console.log("Add user error", err);
        };
    } catch (err) {
      console.log("ERROR", err.error);
    }
  }
}
