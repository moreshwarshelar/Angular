import { Component, OnInit } from '@angular/core';
import { SPListService } from "./sharepoint-data.service";
import {Deals} from "../deals/dealList";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import {Subscription} from "rxjs/Subscription";
import { AppConfig } from "../common/app-config"

@Component({
  selector: 'app-sharepoint-data',
  templateUrl: './sharepoint-data.component.html',
  styleUrls: ['./sharepoint-data.component.css']
})

export class SharepointDataComponent implements OnInit {
  spList: any;
  spListOrg: [];
  public noFilter = "";
  private subscription: Subscription;
  constructor(private spListService: SPListService, private broadcastService : BroadcastService, private msalService: MsalService) { 
  }

  ngOnInit() {
    this.populate();

    this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log("acquire token failure " + JSON.stringify(payload));
      if (payload.errorDesc.indexOf("consent_required") !== -1 || payload.errorDesc.indexOf("interaction_required") != -1 ) {
        this.msalService.acquireTokenPopup(AppConfig.spApiScopes).then( (token) => {
          this.spListService.getItems().subscribe( (results) => {
            this.spList = results.value;
            this.spListOrg = results.value;
          },  (err) => {
            console.log(err);
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
    this.spListService.getItems().subscribe(result => {
      this.spList = result.value;
      this.spListOrg = result.value;
      console.log(result)
    }, error => {
      console.log("access token silent failed");
    });
  }

  public getCount(fltr){
    return this.spListOrg.filter(s => s['DealStage'] == fltr).length;
  }

  public filter(fltr){
    if(this.noFilter == fltr){
      this.spList = this.spListOrg
      this.noFilter = "";
    }else{
      this.spList = this.spListOrg.filter(s => s['DealStage'] == fltr);
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