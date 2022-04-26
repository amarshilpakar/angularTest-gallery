import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images:Array<any> = [];
  constructor(private httpClient: HttpClient) { }

  getImage(): Observable<any> {
    let httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.get(environment.apiUrl, httpOptions).pipe(map((res:any) => {
      return res?.body.pugs
    }))
  }
}
