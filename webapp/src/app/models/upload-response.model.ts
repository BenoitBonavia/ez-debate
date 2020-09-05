export class UploadResponseModel {
  progression: number;
  data: any;
  type: string;

  constructor(progression: number, data: any, type: string) {
    this.progression = progression;
    this.data = data;
    this.type = type;
  }

}
