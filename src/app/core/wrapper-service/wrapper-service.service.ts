import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class HttpApiService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*/*"
  });
  get(apiUrl): Observable<any> {
    return this.http.get<any>(environment.serverUrl + apiUrl);
  }

  post(apiUrl, body?: any) {
    return this.http.post(environment.serverUrl + apiUrl, body);
  }

  put(apiUrl, body): Observable<any> {
    return this.http.put(environment.serverUrl + apiUrl, body);
  }

  delete(apiUrl, id?): Observable<any> {
    return this.http.delete(environment.serverUrl + apiUrl, id);
  }
}
