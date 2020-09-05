import {Injectable} from "@angular/core";
import * as S3 from 'aws-sdk/clients/s3';
import {AuthenticatedUserService} from "./authenticated-user.service";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class AwsS3Service {

  constructor(private authenticatedUserService: AuthenticatedUserService) {

  }

  uploadFile(file) {
    let returnValue = new BehaviorSubject({progression: null, link: null});

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
      returnValue.next({progression: (event.loaded/event.total)*100, link: null})
    }).send((err, data) => {
      if (err) {
        console.log('There was an error uploading your file : ', err);
        returnValue.next({progression: null, link: null});
      }
      console.log('Successfully uploaded file.', data);
      returnValue.next({progression: 100, link: data.url});
    });

    return returnValue.asObservable();
  }
}
