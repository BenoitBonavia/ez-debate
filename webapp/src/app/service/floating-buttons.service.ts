import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable()
export class FloatingButtonsService {

  public readonly editButtonValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly saveButtonEmitter: Subject<any> = new Subject<any>();
  public readonly deleteButtonEmitter: Subject<any> = new Subject<any>();

  toggleEditButtonValue() {
    this.editButtonValue.next(!this.editButtonValue.value)
  }

  resetEditButtonToFalse() {
    this.editButtonValue.next(false);
  }
}
