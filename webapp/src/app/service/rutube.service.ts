import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class RutubeService {

  constructor(private httpClient: HttpClient) {

  }

  uploadVideo(url: string, title: string): Observable<any> {
    return this.httpClient.post('/api/rutube/upload/video', {url, title}) as Observable<any>;
  }
}
