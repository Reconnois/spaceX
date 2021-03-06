import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacexApiService {

  baseUrl = 'https://api.spacexdata.com/v2';

  constructor(private httpClient: HttpClient) { }

  //Company Infos
  getCompanyInfos(): Observable<CompanyInfo>{
    const endpoint = `${this.baseUrl}/info`;
    
    return this.httpClient.get<CompanyInfo>(endpoint)
            .pipe(
              catchError(this.handleError)
            );
  }

  //Company History
  getCompanyHistory(): Observable<CompanyHistory[]>{
    const endpoint = `${this.baseUrl}/info/history`;
    return this.httpClient.get<CompanyHistory[]>(endpoint)
            .pipe(
              catchError(this.handleError)
            );
  }


  //Launch detail
  getLaunch(params: any = null): Observable<Launch>{

    const endpoint = `${this.baseUrl}/launches`;
    let httpParams = new HttpParams();
    
    Object.keys(params.filter).forEach(function(key){
      httpParams = httpParams.append(key, params.filter[key]);
    });

    return this.httpClient.get<Launch>(endpoint, {params: httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }

  //List launches
  getLaunches(params: any = null): Observable<Launch[]>{
    const endpoint = `${this.baseUrl}/launches${params.event}`;
    let httpParams = new HttpParams();

    Object.keys(params.filter).forEach(function(key){
      httpParams = httpParams.append(key, params.filter[key]);
    });
    
    return this.httpClient.get<Launch[]>(endpoint, {params: httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }

  //Launchpad detail
  getLaunchpad(params: any = null): Observable<Launchpad>{
    const endpoint = `${this.baseUrl}/launchpads/${params}`;
    let httpParams = new HttpParams();
    
    return this.httpClient.get<Launchpad>(endpoint, {params: httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }

  //List rockets
  getRockets(params: any = null): Observable<Rocket[]>{
    const endpoint = `${this.baseUrl}/rockets`;
    let httpParams = new HttpParams();

    /*Object.keys(params.filter).forEach(function(key){
      httpParams = httpParams.append(key, params.filter[key]);
    });*/
    
    return this.httpClient.get<Rocket[]>(endpoint, {params: httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }

  //List capsules
  getCapsules(params: any = null): Observable<Capsule[]>{
    const endpoint = `${this.baseUrl}/capsules`;
    let httpParams = new HttpParams();

    /*Object.keys(params.filter).forEach(function(key){
      httpParams = httpParams.append(key, params.filter[key]);
    });*/
    
    return this.httpClient.get<Capsule[]>(endpoint, {params: httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }

  //List cores
  getCores(params: any = null): Observable<Core[]>{
    const endpoint = `${this.baseUrl}/parts/cores`;
    let httpParams = new HttpParams();

    /*Object.keys(params.filter).forEach(function(key){
      httpParams = httpParams.append(key, params.filter[key]);
    });*/
    
    return this.httpClient.get<Core[]>(endpoint, {params: httpParams})
    .pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
