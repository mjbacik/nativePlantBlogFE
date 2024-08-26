import { Component, TemplateRef } from "@angular/core";
// import { PartyService } from "../services/party.service";
import { UserService } from "../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import heic2any from "heic2any";

@Component({
  selector: "app-create-update",
  templateUrl: "./create-update.component.html",
  styleUrls: ["./create-update.component.css"],
})
export class CreateUpdateComponent {
  constructor(
    private router: ActivatedRoute,
    // private partyService: PartyService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  partyId: string;
  email: string;
  userId: string;
  question1Prompt: string;
  question2Prompt: string;
  question3Prompt: string;
  imagesPrompt: string;
  updateForm!: FormGroup;
  questionsLoaded: Promise<boolean>;
  displaySpinner: Promise<boolean>;
  clicked = false;

  alreadyAnswered: Promise<boolean>;
  promptFirstName: Promise<boolean>;

  imageChangedEvent: any = "";
  imageList = [];
  imageBlobs: Blob[] = [];
  toasts: any[] = [];

  async ngOnInit() {
    let error = undefined;
    this.partyId = this.router.snapshot.paramMap.get("partyId");
    this.email = this.router.snapshot.paramMap.get("email");
    this.updateForm = this.fb.group({
      firstName: [""],
      question1: ["", Validators.required],
      question2: ["", Validators.required],
      question3: ["", Validators.required],
    });
    this.userService.getUser(this.email).subscribe((user) => {
      // 1. Check if pending update for user already exists and
      // that expiration hasn't passed
      this.userId = user._id;
      if (!this.userId) {
        this.promptFirstName = Promise.resolve(true);
      } else {
        const now = new Date();
        localStorage.setItem(
          "user",
          JSON.stringify({
            user,
            expiry: now.getTime() + 1000000,
          }),
        );
      }
      // this.partyService.getPartyById(this.partyId).subscribe((party) => {
      //   if (party.pendingResponses.length > 0) {
      //     party.pendingResponses.forEach((response) => {
      //       if (response.userId === user._id) {
      //         error = "User response already exists";
      //         this.alreadyAnswered = Promise.resolve(true);
      //         return;
      //       }
      //     });
      //   }
      //   const now = new Date();
      //   if (party.currentExpiry < now) {
      //     error = "Expiration date passed";
      //     return;
      //   }
      //   this.imagesPrompt = `Add some of your favorite images from the ${this.getDuration(
      //     party.frequency,
      //   )} below`;

      //   this.questionsLoaded = Promise.resolve(true);
      // });
    });
  }

  getDuration(duration: string) {
    switch (duration) {
      case "Bi-Weekly":
        return "2 weeks";
      case "Weekly":
        return "week";
      case "Daily":
        return "day";
      case "Monthly":
        return "month";
      case "Quarterly":
        return "3 months";
      default:
        return duration;
    }
  }

  /**
   *
   * Basically create a stringified object of questions and answers to
   * store for consumption later. Send with image data
   */
  submitResponse(question1: string, question2: string, question3: string) {
    // const questionsAndResponses = {
    //   [this.question1Prompt]: question1,
    //   [this.question2Prompt]: question2,
    //   [this.question3Prompt]: question3,
    // };
    // const responsesStringified = JSON.stringify(questionsAndResponses);
    // const images = this.transformImages();
    // // Receive image IDs after upload, send to user update
    // // {image_ids: [imageIDs]}
    // const firstName = this.updateForm.value.firstName;
    // if (!this.userId && firstName) {
    //   this.userService.createUser(this.email, firstName).subscribe((user) => {
    //     const now = new Date();
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({
    //         user,
    //         expiry: now.getTime() + 1000000,
    //       }),
    //     );
    //     this.partyService
    //       .uploadResponseImages(images)
    //       .subscribe((uploadResponse) => {
    //         this.partyService
    //           .postUserUpdate(
    //             user._id,
    //             this.partyId,
    //             responsesStringified,
    //             uploadResponse.image_ids,
    //           )
    //           .subscribe((response) => {
    //             this.displayConfirmationAndRedirect(
    //               "Update completed - thank you! Until next time.",
    //             );
    //           });
    //       });
    //   });
    // } else {
    //   this.partyService
    //     .uploadResponseImages(images)
    //     .subscribe((uploadResponse) => {
    //       this.partyService
    //         .postUserUpdate(
    //           this.userId,
    //           this.partyId,
    //           responsesStringified,
    //           uploadResponse.image_ids,
    //         )
    //         .subscribe((response) => {
    //           this.displayConfirmationAndRedirect(
    //             "Update completed - thank you! Until next time.",
    //           );
    //         });
    //     });
    // }
  }

  /**
   * Method for generating previews of images
   * after user adds them.
   */
  async createFormData(event) {
    this.displaySpinner = Promise.resolve(true);
    this.imageChangedEvent = event;
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const numberOfImages = fileList.length;

      for (let i = 0; i < numberOfImages; i++) {
        if (fileList[i].name.includes(".HEIC")) {
          const image = await heic2any({
            blob: fileList[i],
            toType: "image/jpeg",
            quality: 0.5,
          });
          this.imageBlobs.push(image as Blob);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageList.push(e.target.result);
          };

          reader.readAsDataURL(image as Blob);
        } else {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageList.push(e.target.result);
          };
          this.imageBlobs.push(fileList[i]);
          reader.readAsDataURL(fileList[i]);
        }
      }
    }
    this.displaySpinner = Promise.resolve(false);
  }

  transformImages(): FormData {
    var formData = new FormData();
    for (let i = 0; i < this.imageBlobs.length; i++) {
      formData.append("images", this.imageBlobs[i], this.imageList[i].name);
    }
    return formData;
  }

  async displayConfirmationAndRedirect(message) {
    this.show(message, {
      delay: 2000,
    });
    await new Promise((f) => setTimeout(f, 2000));
    location.reload();
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
