import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DataModel} from "./data.model";
import {Observable} from "rxjs";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }

  saveData(data: DataModel): Observable<DataModel> {
    return this.http.post('/api/data', data) as Observable<DataModel>
  }
}
