import { Component, TemplateRef } from "@angular/core";
import { User } from "../shared/user";
import { Router } from "@angular/router";
import { Post } from "../shared/post";
import { PostService } from "../services/post.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  firstName: string;
  toasts: any[] = [];
  user: User;
  blogPosts: Post[];
  constructor(private router: Router, private postService: PostService) {}

  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.user = JSON.parse(localStorage.getItem("user")).user;

    this.firstName = user.user.firstname;
    this.postService.getPostsForUser(user.user._id).subscribe((posts) => {
      this.blogPosts = posts;
    });
  }

  signOut() {
    localStorage.removeItem("user");
    this.router.navigate([`/`]);
  }
}
