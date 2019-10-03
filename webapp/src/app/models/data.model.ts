import {SourceModel} from "./source.model";

export class DataModel {
  id: number;
  title: string;
  subtitle: string;
  icon: string = "fas fa-question";
  text: string;
  sources: SourceModel[] =[];
}
