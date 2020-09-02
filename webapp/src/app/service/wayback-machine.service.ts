import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WaybackMachineService {

  constructor(private httpClient: HttpClient) {

  }

  save(url) {
    window.open('https://web.archive.org/save' + url);
  }

  getLastLink(url) {
    this.httpClient.get('http://archive.org/wayback/available?url=' + url).subscribe(response => {
      console.log(response);
    })
  }
}
