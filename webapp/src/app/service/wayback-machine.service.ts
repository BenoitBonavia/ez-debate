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
    return this.httpClient.get('https://community-wayback-machine.p.rapidapi.com/available?url=' + url, {headers: {"X-RapidAPI-Key": "2b1a895973msh6de5f43ff8cd111p1d623cjsn20a1696180ec"}});
  }
}
