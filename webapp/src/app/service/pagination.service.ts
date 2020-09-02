import {Injectable} from "@angular/core";

@Injectable()
export class PaginationService {

  private postPerPage = 15;

  constructor() {
  }

  getPostPerPage() {
    return this.postPerPage;
  }
}
