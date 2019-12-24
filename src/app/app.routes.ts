import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component'
import { ErrorComponent} from './error.component'
import {MsalGuard} from "@azure/msal-angular";
import {TodoListComponent} from "./deals/deal.component";
import {UserDataComponent} from "./user-data/user-data.component";
import { SharepointDataComponent } from "./sharepoint-data/sharepoint-data.component"
import { SPapiComponent } from "./spapi/spapi.component"
import { DealDocumentComponent } from "./deals/deal-documents.component"

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'todoList', component: TodoListComponent, canActivate : [MsalGuard],
    children: [
      { path: 'documents/:id', component: DealDocumentComponent  }
    ]
  },
  { path: 'SPapiList', component: SPapiComponent, canActivate : [MsalGuard] },
  { path: 'userProfile' ,component: UserDataComponent},
  { path: 'spList' ,component: SharepointDataComponent, canActivate : [MsalGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];




