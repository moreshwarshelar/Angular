import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TodoListService } from './deal.service';
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import { AppConfig } from '../common/app-config';

@Component({
  templateUrl: './deal-documents.component.html',
  styleUrls: ['./deal.component.css']
})

export class DealDocumentComponent implements OnInit, OnDestroy  {
  dealDocuments;
  sub;
  fileToUpload: File = null;
  constructor(private _Activatedroute:ActivatedRoute,
               private _router:Router,
               private _dealService:TodoListService){
   }

   onBack(): void {
      this._router.navigate(['todoList']);
   }

   ngOnInit() {
      this.sub=this._Activatedroute.params.subscribe(params => {
         this._dealService.getDealDocuments(params['id']).subscribe(result => {
          this.dealDocuments = result;
          console.log(result)
        }, error => {
          console.log("access token silent failed");
        });
      });
   }

   handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
  this.sub=this._Activatedroute.params.subscribe(params => {
  this._dealService.postFile(this.fileToUpload,params['id']).subscribe(data => {
    console.log(data);
    }, error => {
      console.log(error);
    });
  });
}
   ngOnDestroy() {
     this.sub.unsubscribe();
   }

}
