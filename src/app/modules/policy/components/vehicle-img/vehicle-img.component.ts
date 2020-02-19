import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { PolicyService } from "src/app/shared/services/policy.service";
import * as $ from "jquery";
import { NgxImageCompressService } from "ngx-image-compress";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as VehicleImgsActions from "../../../../actions/vehicleImgs.action";

@Component({
  selector: "app-vehicle-img",
  templateUrl: "./vehicle-img.component.html",
  styleUrls: ["./vehicle-img.component.scss"]
})
export class VehicleImgComponent implements OnInit {
  fileData: File;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  errorUplode: boolean = false;
  formData = new FormData();
  policy;
  @Input() payCheck;
  @Input() img;
  @Input() uploaded;
  @ViewChild("image", { static: false }) image: ElementRef;

  constructor(
    private policyService: PolicyService,
    private imageCompress: NgxImageCompressService,
    private store: Store<AppState>
  ) {
    this.policy = JSON.parse(localStorage.getItem("policy"));
  }

  ngOnInit() {
    // console.log(this.img);
    if (localStorage.getItem(this.img.label)) {
      this.previewUrl = JSON.parse(localStorage.getItem(this.img.label)).url;
    }
  }
  fileProgress(fileInput: any) {
    console.log(fileInput);
    this.fileData = null;
    this.fileData = fileInput.target.files[0];
    console.log(fileInput.target.files[0]);
    this.formData.delete("File");
    // this.compressFile(<File>fileInput.target.files[0]);
    // this.imageCompress.uploadFile().then(({ image, orientation }) => {
    //  this.imgResultBeforeCompress = image;
    // console.log("incom");
    // console.warn(
    //   "Size in bytes was:",
    //   this.imageCompress.byteCount(this.fileData)
    // );
    this.formData.append("File", this.fileData);
    this.formData.append("VehicleId", this.policy.VehicleDetails.VehicleID);
    // this.formData.append("access-token", localStorage.getItem("access-token"));
    this.formData.append("PolicyNo", localStorage.getItem("policyId"));
    // this.formData.append("imageLat", "00");
    // this.formData.append("imageLong", "00");
    this.formData.append("key", this.img.value);
    this.formData.append(
      "x_correlation_id",
      localStorage.getItem("x_correlation_id")
    );
    console.log(this.formData);
    this.policyService.postVehicleImgs(this.formData).subscribe((res: any) => {
      // this.uploadedFilePath = res.data.filePath;
      // this.previewUrl = res.data.response[0].fileUrl;
      if (res.success) {
        console.log(res);
        this.errorUplode = false;
        // this.preview();
        this.uploadedFilePath = res.data.filePath;
        this.previewUrl = res.data.response[0].FileUrl;
        this.store.dispatch(
          new VehicleImgsActions.AddVehicleImgs({
            label: this.img.label,
            url: this.previewUrl
          })
        );
        localStorage.setItem(
          this.img.label,
          JSON.stringify({ label: this.img.label, url: this.previewUrl })
        );
      } else if (res.code === 400) {
        this.previewUrl = null;
        this.errorUplode = true;
      }

      // console.log(imgId, this.previewUrl);

      // $("#vImg-" + imgId).attr("src", this.previewUrl);
      // alert("SUCCESS !!");
    });
  }
  // compressFile(image) {
  //   console.log(image);
  //   var orientation = -1;
  //   this.imageCompress.compressFile(image, orientation, 50, 50).then(result => {
  //     const imageBlob = this.dataURItoBlob(result.split(",")[1]); //imageFile created below is the new compressed file which can be send to API in form dataconst imageFile = new File([result], imageName, { type: 'image/jpeg' });
  //     console.log(imageBlob);
  //   });
  // }
  // dataURItoBlob(dataURI) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: "image/jpeg" });
  //   return blob;
  // }
  ngAfterViewInit() {
    // Circle logic (fill colors, etc.)

    if (this.image) {
      // this.image.nativeElement.scr = this.color;
    }
  }
  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.previewUrl = reader.result;
    };
  }
  // onSubmit() {
  //   // const formData = new this.formData();
  //   this.formData.append("file", this.fileData);
  //   let data = {
  //     VehicleId: "89831fc8-2e13-4b57-90dc-838bdf1aa68d",
  //     PolicyId: localStorage.getItem("policyId"),
  //     UserId: localStorage.getItem("access-token"),
  //     File: this.formData,
  //     ImageLong: null,
  //     ImageLat: null,
  //     Key: null
  //   };
  //   this.policyService.postVehicleImgs(data).subscribe((res: any) => {
  //     console.log(res);
  //     if (res.code == 200) {
  //       this.uploadedFilePath = res.data.filePath;
  //       this.previewUrl = res.data.response[0].fileUrl;

  //     } else if (res.code === 400) {
  //       this.errorUplode = true;
  //     }
  //     // alert("SUCCESS !!");
  //   });
  // }
  deleteImg() {
    this.previewUrl = null;
    localStorage.removeItem(this.img.label);
    this.store.dispatch(
      new VehicleImgsActions.RemoveVehicleImg(this.img.label)
    );
    this.errorUplode = true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.uploaded) {
      if (this.previewUrl == null) {
        this.errorUplode = true;
        $("html, body").animate(
          {
            scrollTop: $("#app-vehicle-img").offset().top - 150
          },
          200
        );
      }
    } else {
      this.errorUplode = false;
    }
  }
}
