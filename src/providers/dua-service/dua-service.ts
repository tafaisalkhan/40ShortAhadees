/* * * ./app/comments/components/comment.service.ts * * */
// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DuaServiceProvider {
      constructor (private http: Http) {}

      getAhadeesList() : Observable<any>{
        return this.http.get("assets/json/shortAhadees.json")
                        .map((res:Response) => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }


}
