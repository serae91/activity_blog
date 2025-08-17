import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, PartialObserver, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private httpClient = inject(HttpClient)
  private snackbar = inject(MatSnackBar)
  protected baseUrl = '';

  protected get<T>(url: string, errorMessage: (error: any) => string, successMessage?: (response: T) => string): Observable<T> {
    return this.pipeSnackbar(this.httpClient.get<T>(this.baseUrl + url), errorMessage, successMessage);
  }

  protected post<T>(url: string, body: any, errorMessage: (error: any) => string, successMessage?: (response: T) => string): Observable<T> {
    return this.pipeSnackbar(this.httpClient.post<T>(this.baseUrl + url, body), errorMessage, successMessage);
  }

  protected put<T>(url: string, body: any, errorMessage: (error: any) => string, successMessage?: (response: T) => string): Observable<T> {
    return this.pipeSnackbar(this.httpClient.put<T>(this.baseUrl + url, body), errorMessage, successMessage);
  }

  protected delete<T>(url: string, errorMessage: (error: any) => string, successMessage?: (response: T) => string): Observable<T> {
    return this.pipeSnackbar(this.httpClient.delete<T>(this.baseUrl + url), errorMessage, successMessage);
  }

  private pipeSnackbar<T>(observable: Observable<T>, errorMessage: (error: any) => string, successMessage?: (response: T) => string): Observable<T> {
    return observable.pipe(tap({
      next: (response: T) => {
        if(successMessage) this.snackbar.open(successMessage(response),'', {duration: 300})
      },
      error: (error) => this.snackbar.open(errorMessage(error))
    } as PartialObserver<T>))
  }

  protected setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }
}
