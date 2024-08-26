import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  AuthInterceptor,
  UnauthorizedInterceptor,
} from "./services/auth.interceptor";
import { RouteReuseStrategy, DetachedRouteHandle } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { baseURL } from "./shared/baseurl";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProcessHttpmsgService } from "./services/process-httpmsg.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LandingComponent } from "./landing/landing.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { AboutComponent } from "./about/about.component";
import { CreateUpdateComponent } from "./create-update/create-update.component";
import { BlogComponent } from "./blog/blog.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { RegisterComponent } from "./register/register.component";

export class MyCustomRouteReuseStrategy implements RouteReuseStrategy {
  // Never reuse a component!
  shouldReuseRoute(): boolean {
    return false;
  }

  // Implement the other default methods. Keep same functionality.
  shouldDetach(): boolean {
    return false;
  }
  store(): void {}
  shouldAttach(): boolean {
    return false;
  }
  retrieve(): DetachedRouteHandle | null {
    return null;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    CreateUpdateComponent,
    BlogComponent,
    CreatePostComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  providers: [
    { provide: "BaseURL", useValue: baseURL },
    ProcessHttpmsgService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: MyCustomRouteReuseStrategy },
    // {provide: BrowserXhr, useClass:CustExtBrowserXhr}
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
