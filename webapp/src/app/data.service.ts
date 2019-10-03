import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DataModel} from "./models/data.model";
import {Observable} from "rxjs";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<DataModel[]> {
    return this.http.get('/api/data/all') as Observable<DataModel[]>;
  }

  saveData(data: DataModel): Observable<DataModel> {
    return this.http.post('/api/data', data) as Observable<DataModel>;
  }
}
