import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Blog } from "../shared/blog";
import { BlogService } from "../services/blog.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent {
  constructor(
    private router: ActivatedRoute,
    private blogService: BlogService,
    private route: Router,
  ) {}

  blogId: string;
  blog: Blog;
  blogLoaded: Promise<boolean>;
  ngOnInit() {
    this.blogId = this.router.snapshot.paramMap.get("blogId");
    this.blogService.getBlogById(this.blogId).subscribe((blog) => {
      this.blog = blog;
      this.blogLoaded = Promise.resolve(true);
    });
  }

  createPostForBlog(blog: Blog) {
    const user = localStorage.getItem("user");
    if (user === null) {
      this.route.navigate([`register`]);
    } else {
      this.route.navigate([`create/${blog._id}`]);
    }
  }
}
