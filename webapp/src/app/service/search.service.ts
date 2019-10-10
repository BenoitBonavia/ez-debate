import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataModel} from "../models/data.model";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {

  }

  search(params: string): Observable<DataModel[]> {
    return this.httpClient.get('/api/search/' + params) as Observable<DataModel[]>;
  }
}
