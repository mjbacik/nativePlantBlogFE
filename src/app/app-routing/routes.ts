import { Routes } from "@angular/router";
import { LandingComponent } from "../landing/landing.component";
import { BlogComponent } from "../blog/blog.component";
import { CreatePostComponent } from "../create-post/create-post.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RegisterComponent } from "../register/register.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    data: {
      title: "NativePlantBlog Home",
    },
  },
  {
    path: "create/:blogId",
    component: CreatePostComponent,
    data: {
      title: "Create New Post",
    },
  },
  {
    path: "blog/:blogId",
    component: BlogComponent,
    data: {
      title: "Blog Page",
    },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      title: "Dashboard",
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register",
    },
  },
  {
    path: "**",
    redirectTo: "",
  },
];
