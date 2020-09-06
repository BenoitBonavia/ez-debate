import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AwsS3Service} from "../../service/aws-s3.service";
import {ProgressBarMode} from '@angular/material/progress-bar';
import {UploadResponseModel} from "../../models/upload-response.model";

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

  @Output() uploadedFileChange = new EventEmitter<UploadResponseModel>();

  @Input() displayFiles: boolean = true;
  @Input() hideWhenLoaded: boolean = true;
  // @Input() progressionForm: string = ProgressionForm.Bar;

  toUploadFiles = [];
  uploadStatus = new Map();
  keySet = new Set();

  constructor(private awsS3Service: AwsS3Service) {
  }

  addFilesInToUploadFiles(files: [File]) {
    for (let file of files) {
      if (file.type.includes("image")) {
        this.uploadStatus.set(file.name, null);
        this.keySet.add(file.name);
        this.awsS3Service.uploadFile(file).subscribe(response => {
          this.uploadStatus.set(file.name, response);
          if (response.data && response.type) {
            this.uploadedFileChange.emit(response);
          }
        })
      }
    }
  }
}
