import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WaybackMachineService {

  constructor(private httpClient: HttpClient) {

  }

  save(url) {
    window.open('https://web.archive.org/save' + url);
  }

  getLinks(url) {
    return this.httpClient.get('/waybackmachine/wayback/available?url==' + url);
  }
}
