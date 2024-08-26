import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../services/post.service";
import { BlogService } from "../services/blog.service";
import { Blog } from "../shared/blog";
import { Router } from "@angular/router";
import { User } from "../shared/user";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent {
  constructor(
    private router: ActivatedRoute,
    private postService: PostService,
    private route: Router,
    private blogService: BlogService,
    private fb: FormBuilder,
  ) {}

  blogId: string;
  createForm!: FormGroup;
  blog: Blog;
  blogLoaded: Promise<boolean>;
  user: User;
  ngOnInit() {
    this.createForm = this.fb.group({
      title: ["", Validators.required],
      text: ["", Validators.required],
    });
    this.blogId = this.router.snapshot.paramMap.get("blogId");
    this.blogService.getBlogById(this.blogId).subscribe((blog) => {
      this.blog = blog;
      this.blogLoaded = Promise.resolve(true);
    });
  }

  createPostForBlog(blog: Blog) {
    this.route.navigate([`create/${blog._id}`]);
  }

  submit(blog: Blog, title: string, text: string) {
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user).user._id;
    this.postService
      .createPost(userId, blog._id, title, text)
      .subscribe((postResponse) => {
        console.log("POST RESPONSE", postResponse);
        this.route.navigate([`/blog/${blog._id}`]);
      });
  }
}
