import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {AppConfig} from "../common/app-config"

@Injectable()
export class SPListService {
  constructor(private http: HttpClient) {
  }

  getItems(): Observable<any> {
    return this.http.get(AppConfig.sharepointURL)
      .map((response: Response) =>
        response
      )
      .catch(response => (Observable.throw(response)
      ))
  }

  postItem(item: any) {
    return this.http.post(AppConfig.sharepointURL+AppConfig.sharepointList, item, {responseType: 'text'})
      .map((response) => {
        return response;
      })
  }
}
