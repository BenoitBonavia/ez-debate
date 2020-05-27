import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DataModel} from "../models/data.model";
import {Observable} from "rxjs";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  getDataDetail(id: number): Observable<DataModel> {
    return this.http.get('/api/data/detail/' + id) as Observable<DataModel>;
  }

  getAll(): Observable<DataModel[]> {
    return this.http.get('/api/data/light/all') as Observable<DataModel[]>;
  }

  getPageByTag(tag: string, pageNumber: string): Observable<DataModel[]> {
    return this.http.get('/api/data/light', {params: {tag, pageNumber}}) as Observable<DataModel[]>;
  }

  saveData(data: DataModel): Observable<DataModel> {
    return this.http.post('/api/data', data) as Observable<DataModel>;
  }

  deleteData(dataId: number): Observable<any> {
    return this.http.delete('/api/data/' + dataId) as Observable<any>;
  }
}
