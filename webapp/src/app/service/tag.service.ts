import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TagModel} from "../models/tag.model";

@Injectable()
export class TagService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<TagModel[]> {
    return this.httpClient.get('/api/tag/all') as Observable<TagModel[]>;
  }

  saveTag(tag: TagModel): Observable<TagModel> {
    return this.httpClient.post('/api/tag', tag) as Observable<TagModel>;
  }
}

