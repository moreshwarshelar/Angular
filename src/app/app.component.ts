import {Component, OnDestroy, OnInit} from '@angular/core';
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import {Subscription} from "rxjs/Subscription";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { SPapiComponent } from './spapi/spapi.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Msal Angular Demo';
  searchString = "Hi"
  loggedIn : boolean;
  userName:string;
  public userInfo: any = null;
  private subscription: Subscription;
  public isIframe: boolean;
  location:Location;
  
  constructor(private broadcastService: BroadcastService , private authService : MsalService)
  {
    //  This is to avoid reload during acquireTokenSilent() because of hidden iframe
    this.isIframe = window !== window.parent && !window.opener;
   if(this.authService.getUser())
    {
      this.loggedIn = true;
      this.userName = this.authService.getUser().name;
    }
   else {
     this.loggedIn = false;
   }
  }

  login()
  {
    const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  logout()
  {
   this.authService.logout();
  }

  ngOnInit() {

    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      this.loggedIn = false;

    });

    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      this.loggedIn = true;
      this.userName = this.authService.getUser().name;
    });

  }

 ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getClass(path){
    console.log(path);
    return (this.location.path().substr(0, path.length) === path) ? 'active' : '';
  }

}
