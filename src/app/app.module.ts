import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component'
import {ErrorComponent} from './error.component'
import {appRoutes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MsalModule} from "@azure/msal-angular";
import { MsalInterceptor} from "@azure/msal-angular";
import { TodoListComponent } from './deals/deal.component';
import {DealDocumentComponent} from './deals/deal-documents.component'
import {TodoListService} from "./deals/deal.service";
import {UserDataComponent} from "./user-data/user-data.component";
import { HttpServiceHelper } from './common/HttpServiceHelper';
import {AppConfig} from './common/app-config';
import { SharepointDataComponent } from './sharepoint-data/sharepoint-data.component';
import { SPListService } from './sharepoint-data/sharepoint-data.service';
import { SPapiComponent } from './spapi/spapi.component'

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ErrorComponent, TodoListComponent, UserDataComponent, SharepointDataComponent, SPapiComponent,DealDocumentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash:true}) ,
    MsalModule.forRoot({
        clientID: AppConfig.angularClientID,
        authority: AppConfig.authority,
        consentScopes: AppConfig.consentScopes,
        protectedResourceMap: [ [AppConfig.webApiEndpoint,AppConfig.webApiScopes] , [AppConfig.userProfileEndpoint, AppConfig.userProfileScopes],[AppConfig.sharepointURL, AppConfig.spApiScopes] ],
        validateAuthority: true,
        redirectUri: AppConfig.redirectUri,
        cacheLocation : AppConfig.cacheLocation,
        postLogoutRedirectUri: AppConfig.postLogoutRedirectUri,
        navigateToLoginRequestUrl: AppConfig.navigateToLoginRequestUrl,
        unprotectedResources: AppConfig.unprotectedResources,        
        logger: loggerCallback,
        correlationId: AppConfig.correlationId,
        piiLoggingEnabled: AppConfig.piiLoggingEnabled
      }
    ),
  ],
  providers: [TodoListService, HttpServiceHelper, SPListService,
     {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
