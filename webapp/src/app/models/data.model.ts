import {SourceModel} from "./source.model";
import {MediaModel} from "./media.model";
import {TagModel} from "./tag.model";

export class DataModel {
  id: number;
  title: string;
  subtitle: string;
  icon: string = "fas fa-question";
  text: string = '';
  sources: SourceModel[] =[];
  tags: TagModel[] = [];
  medias: MediaModel[] = [];
  date: Date;
}
