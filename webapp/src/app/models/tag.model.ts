import {TagTypeModel} from "./tag-type.model";

export class TagModel {
  id: number;
  tag: string;
  type: TagTypeModel;
  favorite: boolean;
}
