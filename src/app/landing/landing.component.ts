import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { DataService } from "../services/data.service";
import { BlogService } from "../services/blog.service";
import { Router } from "@angular/router";
import { Blog } from "../shared/blog";

@Component({
	selector: "app-landing",
	templateUrl: "./landing.component.html",
	styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
	signup: Promise<boolean>;
	landingLoaded: Promise<boolean>;
	blogs: Blog[];

	constructor(
		private userService: UserService,
		private dataService: DataService,
		private blogService: BlogService,
		private router: Router,
	) {}

	ngOnInit() {
		const blogs = this.blogService.getAll().subscribe((blogs) => {
			console.log("BLOGS", blogs);
			this.blogs = blogs;
		});
	}

	goToBlog(blog: Blog) {
		this.router.navigate([`/blog/${blog._id}`]);
	}

	/**
	 * Looks for existing user and routes to user
	 * dashboard if exists, otherwise routes to registration
	 */
	async search(email: string) {
		this.userService.getUser(email).subscribe(
			async (res) => {
				if (!res?._id) {
					this.dataService.setUserEmail(email);
					this.router.navigate([`/register`]);
				} else {
					const now = new Date();
					this.dataService.setUser(res);
					localStorage.setItem(
						"user",
						JSON.stringify({
							user: res,
							expiry: now.getTime() + 1000000,
						}),
					);
					this.router.navigate([`/dashboard`]);
				}
			},
			(error) => {
				console.log("error in retrieving landing", error);
			},
		);
	}
}
