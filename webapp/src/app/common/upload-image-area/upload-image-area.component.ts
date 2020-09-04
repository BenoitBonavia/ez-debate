import {Component} from "@angular/core";

@Component({
  selector: 'ed-upload-image-area',
  templateUrl: 'upload-image-area.component.html',
  styleUrls: ['upload-image-area.component.scss']
})
export class UploadImageAreaComponent {

  toUploadFiles = [];

  addFilesInToUploadFiles(files: [File]) {
    for (let image of files) {
      if (image.type.includes("image")) {
        this.toUploadFiles.push(image);
      }
    }
  }
}
