import {SourceModel} from "./source.model";

export class DataModel {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  text: string;
  sources: SourceModel[] =[];
}
