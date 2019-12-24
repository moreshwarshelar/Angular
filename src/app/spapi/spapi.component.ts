import { Component, OnInit,Input} from '@angular/core';
import {TodoListService} from "../deals/deal.service";
import {Deals} from "../deals/dealList";
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import { AppConfig } from '../common/app-config';

@Component({
  selector: 'app-spapi',
  templateUrl: './spapi.component.html',
  styleUrls: ['./spapi.component.css']
})
export class SPapiComponent implements OnInit {
  private error = "";
  public noFilter = "";
  private noFilterClass = "nofilter";
  todoList: Deals[];
  todoListOrg: Deals[];
  private subscription: Subscription;
  
  constructor(private todoListService: TodoListService, private broadcastService : BroadcastService, private msalService: MsalService) { }

  ngOnInit() {
    this.populate();

    this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log("acquire token failure " + JSON.stringify(payload));
      if (payload.errorDesc.indexOf("consent_required") !== -1 || payload.errorDesc.indexOf("interaction_required") != -1 ) {
        this.msalService.acquireTokenPopup(AppConfig.webApiScopes).then( (token) => {
          this.todoListService.getItems().subscribe( (results) => {
            this.todoList = results;
            this.todoListOrg = results;
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
    this.todoListService.getItems().subscribe(result => {
      this.todoList = result;
      this.todoListOrg = result;
      console.log(result)
    }, error => {
      console.log("access token silent failed");
      this.error = error;
    });
  }

  public getCount(fltr){
    return this.todoListOrg.filter(s => s.dealStage == fltr).length;
  }

  public filter(fltr){
    if(this.noFilter == fltr){
      this.todoList = this.todoListOrg
      this.noFilter = "";
    }else{
      this.todoList = this.todoListOrg.filter(s => s.dealStage == fltr);
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
