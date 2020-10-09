import {Component, Inject, Injectable, Output, EventEmitter} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmationDialogConfigModel} from "./confirmation-dialog-config.model";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ConfirmationDialogComponent {
  constructor(private dialog: MatDialog) {}

  private onClickYesSubject = new Subject();
  private onClickNoSubject = new Subject();
  onClickYes = this.onClickYesSubject.asObservable();
  onClickNo = this.onClickNoSubject.asObservable();

  openDialog(confirmationDialogConfig: ConfirmationDialogConfigModel) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      question: confirmationDialogConfig.question,
      swapColor: confirmationDialogConfig.swapColors
    }

    const dialogRef = this.dialog.open(ConfirmationDialogContentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.onClickYes.subscribe(() => {
      if (confirmationDialogConfig.closeOnYes) dialogRef.close();
      this.onClickYesSubject.next();
    })
    dialogRef.componentInstance.onClickNo.subscribe(() => {
      if (confirmationDialogConfig.closeOnNo) dialogRef.close();
      this.onClickNoSubject.next();
    })
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }
}
@Component({
  selector: 'confirmation-dialog-content',
  templateUrl: 'confirmation-dialog-content.component.html'
})
export class ConfirmationDialogContentComponent {

  @Output()
  onClickYes = new EventEmitter();

  @Output()
  onClickNo = new EventEmitter();

  question: string
  swapColor: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) private data) {
    this.question = data.question;
    this.swapColor = data.swapColor;
  }

  clickYes() {
    this.onClickYes.emit(null);
  }

  clickNo() {
    this.onClickNo.emit(null);
  }
}
