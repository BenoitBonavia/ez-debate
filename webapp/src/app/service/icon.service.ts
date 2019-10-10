import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IconModel} from "../models/icon.model";

@Injectable()
export class IconService {

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<IconModel[]> {
    return this.http.get('/api/icon/all') as Observable<IconModel[]>;
  }

  saveIcon(icon: IconModel): Observable<IconModel> {
    return this.http.post('/api/icon', icon) as Observable<IconModel>
  }
}
