import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TagModel} from "../models/tag.model";
import {TagTypeModel} from "../models/tag-type.model";

@Injectable()
export class TagService {

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<TagModel[]> {
    return this.httpClient.get('/api/tag/all') as Observable<TagModel[]>;
  }

  getTagsByType(type: TagTypeModel): Observable<TagModel[]> {
    return this.httpClient.get('/api/tag/all/type/' + type.id) as Observable<TagModel[]>;
  }

  saveTagType(tagType: TagTypeModel): Observable<TagTypeModel> {
    return this.httpClient.post('/api/tag/type', tagType) as Observable<TagTypeModel>
  }

  saveTag(tag: TagModel): Observable<TagModel> {
    return this.httpClient.post('/api/tag', tag) as Observable<TagModel>;
  }

  getAllTypes(): Observable<TagTypeModel[]> {
    return this.httpClient.get('/api/tag/type/all') as Observable<TagTypeModel[]>;
  }

  switchFavorite(id: number): Observable<TagModel> {
    return this.httpClient.get('/api/tag/' + id + '/favorite') as Observable<TagModel>;
  }

  deleteTag(tag: TagModel): Observable<TagModel> {
    return this.httpClient.delete('/api/tag/' + tag.id) as Observable<TagModel>;
  }

  deleteTagType(tagType: TagTypeModel): Observable<TagTypeModel> {
    return this.httpClient.delete('/api/tag/type/' + tagType.id) as Observable<TagTypeModel>;
  }
}

