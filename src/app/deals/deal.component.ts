import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoListService} from "./deal.service";
import {Deals} from "./dealList";
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import { AppConfig } from '../common/app-config';

@Component({
  selector: 'app-todo-list',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy  {

 private error = "";
  public loadingMessage = "Loading...";
  todoSPListOrg: Deals[];
  todoSPList: Deals[];
  public noFilter = "";
  private submitted = false;
  private subscription: Subscription;
  constructor(private todoListService: TodoListService, private broadcastService : BroadcastService, private msalService: MsalService) { }

  ngOnInit() {
    this.populate();

    this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log("acquire token failure " + JSON.stringify(payload));
      if (payload.errorDesc.indexOf("consent_required") !== -1 || payload.errorDesc.indexOf("interaction_required") != -1 ) {
        this.msalService.acquireTokenPopup(AppConfig.webApiScopes).then( (token) => {
          this.todoListService.getItems().subscribe( (results) => {
            this.todoSPList = results;
            this.todoSPListOrg = results;
          },  (err) => {
            this.error = err;
          });
        },  (error) => {
        });
      }
    });


   this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log("acquire token success");
    });
  }

  public populate() {    
    this.todoListService.getSPItems().subscribe(result => {
      this.todoSPList = result;
      this.todoSPListOrg = result;
      console.log(result)
    }, error => {
      console.log("access token silent failed");
      this.error = error;
    });
  }

  public getCount(fltr){
    return this.todoSPListOrg.filter(s => s.dealStage == fltr).length;
  }

  public filter(fltr){
    if(this.noFilter == fltr){
      this.todoSPList = this.todoSPListOrg
      this.noFilter = "";
    }else{
      this.todoSPList = this.todoSPListOrg.filter(s => s.dealStage == fltr);
      this.noFilter = fltr
    }
  }

//extremely important to unsubscribe
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
   if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
