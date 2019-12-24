import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {AppConfig} from "../common/app-config"

@Injectable()
export class TodoListService {
  constructor(private http: HttpClient) {
  }

  getItems(): Observable<any> {
    return this.http.get(AppConfig.webApiEndpoint+"/deals/hardcoded")
      .map((response: Response) =>
        response
      )
      .catch(response => (Observable.throw(response)
      ))
  }

  getSPItems(): Observable<any> {
    return this.http.get(AppConfig.webApiEndpoint+"/deals")
      .map((response: Response) =>
        response
      )
      .catch(response => (Observable.throw(response)
      ))
  }

  getDealDocuments(id:string): Observable<any> {
    return this.http.get(AppConfig.webApiEndpoint+"/deals/documents/"+ id)
      .map((response: Response) =>
        response
      )
      .catch(response => (Observable.throw(response)
      ))
  }

  postFile(fileToUpload: File,id:string): Observable<boolean> {
    const endpoint = AppConfig.webApiEndpoint+"/deals/documents/"+ id+"/upload";
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData).map(() => { return true; })
      .catch(response => (Observable.throw(response)
      ));
  }
}
