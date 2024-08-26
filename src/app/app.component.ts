import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "neonangular";
  fullScreen: Promise<boolean>;

  toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen;
    // || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen;
    // || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    requestFullScreen.call(docEl);
    this.fullScreen = Promise.resolve(true);
  }

  exitFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;
    var cancelFullScreen = doc.exitFullscreen;
    cancelFullScreen.call(doc);
    this.fullScreen = Promise.resolve(false);
  }
}
