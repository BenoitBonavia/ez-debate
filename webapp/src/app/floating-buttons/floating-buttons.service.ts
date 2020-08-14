import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class FloatingButtonsService {

  private editButtonValueSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly editButtonValue: Observable<boolean> = this.editButtonValueSource.asObservable();

  toggleEditButtonValue() {
    this.editButtonValueSource.next(!this.editButtonValueSource.value)
  }
}
