import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Car } from '../selectionManager/vehiclegrid/vehiclegrid.component';
import { Action, Store } from '@ngrx/store';
//import { Item,VehicleInfo } from '../common/store';

import { ADD_VEHICLEITEMS} from '../common/store';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

interface AppState {
    counter: number;
  }
@Injectable()
export class UserService {
    //store: any;
    private headers:HttpHeaders; 
    //private options: RequestOptions;
    userInfo:any;

    constructor(private http: HttpClient,private store: Store<any>) {
        this.userInfo={'userId':0 ,'userGrpId':0 ,'guid':''}
        this.headers =  new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
      //  this.options = new RequestOptions({ headers: this.headers });
    }


   

    userSettings(url:string,userInput:any) {
        return this.http.post(url, JSON.stringify(userInput), {headers:this.headers})        
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user:any = response;
                if (user) {
                    this.userInfo={'userId':user.userId ,'userGrpId':user.usrgrpid}
                    // store user details and jwt token in local storage to keep user logged in between page refreshes   
                    let userStore:any = localStorage.getItem('currentUser');
                    userStore = JSON.parse(userStore)
                    userStore.user.settings = user;   
                    localStorage.setItem('currentUser', JSON.stringify(userStore));
                    return userStore;
                }
            });
    }

   
    private extractDetailData(res: Response) {
        let body = res;
        return body || [];
      }

      private handleError(error: any) {
        // We'd also dig deeper into the error to get a better message
        let errMsg = error.message || error.statusText || 'Server error';
        return Observable.throw(errMsg);
      }
      
}