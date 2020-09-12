import {Injectable} from "@angular/core";
import * as S3 from 'aws-sdk/clients/s3';
import {AuthenticatedUserService} from "./authenticated-user.service";
import {BehaviorSubject, Observable} from "rxjs";
import {UploadResponseModel} from "../models/upload-response.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AwsS3Service {

  private bucketName: string;
  private accessKey: string;
  private secretKey: string;

  constructor(private httpClient: HttpClient, private authenticatedUserService: AuthenticatedUserService) {
    this.initUploadConfig();
  }

  initUploadConfig() {
    this.httpClient.get("/api/s3/bucket", {responseType: 'text'}).subscribe(response => this.bucketName = response);
    this.httpClient.get("/api/s3/accessKey", {responseType: 'text'}).subscribe(response => this.accessKey = response);
    this.httpClient.get("/api/s3/secretKey", {responseType: 'text'}).subscribe(response => this.secretKey = response);
  }

  uploadFile(file): Observable<UploadResponseModel> {
    let returnValue = new BehaviorSubject(new UploadResponseModel(null, null, null));

    if (!this.authenticatedUserService.isUserAuthenticatedAdmin()) {
      throw new Error('You\'re not allowed to use this feature. It request admin privileges.')
    }
    const contentType = file.type;

    const bucket = new S3(
      {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
        region: 'eu-west-3'
      }
    );

    const params = {
      Bucket: this.bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    }

    bucket.upload(params).on('httpUploadProgress', (event) => {
      returnValue.next(new UploadResponseModel((event.loaded/event.total)*100, null, null));
    }).send((err, data) => {
      if (err) {
        console.log('There was an error uploading your file : ', err);
        returnValue.next(new UploadResponseModel(null, null, null));
      }
      console.log('Successfully uploaded file.', data);
      returnValue.next(new UploadResponseModel(100, data, file.type))
    });

    return returnValue.asObservable();
  }
}
