import {SourceModel} from "./source.model";
import {VideoModel} from "./video.model";

export class DataModel {
  id: number;
  title: string;
  subtitle: string;
  icon: string = "fas fa-question";
  text: string;
  sources: SourceModel[] =[];
  videos: VideoModel[] = [];
  date: Date;
}
