import {SourceModel} from "./source.model";
import {VideoModel} from "./video.model";
import {TagModel} from "./tag.model";

export class DataModel {
  id: number;
  title: string;
  subtitle: string;
  icon: string = "fas fa-question";
  text: string = '';
  sources: SourceModel[] =[];
  tags: TagModel[] = [];
  videos: VideoModel[] = [];
  date: Date;
}
