import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AwsS3Service} from "../../service/aws-s3.service";
import {ProgressBarMode} from '@angular/material/progress-bar';

// export enum ProgressionForm {
//   Circle = "CIRCLE",
//   Bar = "BAR"
// }

@Component({
  selector: 'ed-upload-image-area',
  templateUrl: 'upload-image-area.component.html',
  styleUrls: ['upload-image-area.component.scss']
})
export class UploadImageAreaComponent {

  @Output() uploadedFileChange = new EventEmitter();

  @Input() displayFiles: boolean = true;
  @Input() hideWhenLoaded: boolean = true;
  // @Input() progressionForm: string = ProgressionForm.Bar;

  toUploadFiles = [];
  uploadStatus = new Map();
  keySet = new Set();

  constructor(private awsS3Service: AwsS3Service) {
  }

  addFilesInToUploadFiles(files: [File]) {
    for (let image of files) {
      if (image.type.includes("image")) {
        this.uploadStatus.set(image.name, null);
        this.keySet.add(image.name);
        this.awsS3Service.uploadFile(image).subscribe(response => {
          this.uploadStatus.set(image.name, response);
          if (response.link) {
            this.uploadedFileChange.emit(response);
          }
        })
      }
    }
  }
}
