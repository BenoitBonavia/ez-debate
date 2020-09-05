import {Injectable} from "@angular/core";
import * as S3 from 'aws-sdk/clients/s3';
import {AuthenticatedUserService} from "./authenticated-user.service";
import {BehaviorSubject, Observable} from "rxjs";
import {UploadResponseModel} from "../models/upload-response.model";

@Injectable()
export class AwsS3Service {

  constructor(private authenticatedUserService: AuthenticatedUserService) {

  }

  uploadFile(file): Observable<UploadResponseModel> {
    let returnValue = new BehaviorSubject(new UploadResponseModel(null, null, null));

    if (!this.authenticatedUserService.isUserAuthenticatedAdmin()) {
      throw new Error('You\'re not allowed to use this feature. It request admin privileges.')
    }
    const contentType = file.type;

    const bucket = new S3(
      {
        accessKeyId: 'AKIA2OS43LYJVVA5QX76',
        secretAccessKey: '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',
        region: 'eu-west-3'
      }
    );

    const params = {
      Bucket: 'ezdebate',
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
