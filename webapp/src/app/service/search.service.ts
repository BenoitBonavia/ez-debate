import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataModel} from "../models/data.model";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {

  }

  search(params: string, page: number): Observable<DataModel[]> {
    return this.httpClient.get('/api/search/keyword=' + params + '&page=' + page) as Observable<DataModel[]>;
  }

  searchByTag(tag: string, page: number): Observable<any> {
    return this.httpClient.get('/api/search/tags=' + tag + '&page=' + page) as Observable<any>;
  }
}
