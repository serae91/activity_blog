import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { concatMap, Observable, of, PartialObserver, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmationModal,
  ConfirmationModalDataDto,
} from '../../shared/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private httpClient = inject(HttpClient);
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private baseUrl = '';

  protected setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  protected get<T>(
    url: string,
    errorMessage: (error: HttpErrorResponse) => string,
    successMessage?: (response: T) => string
  ): Observable<T> {
    return this.pipeSnackbar(
      this.httpClient.get<T>(this.baseUrl + url),
      errorMessage,
      successMessage
    );
  }

  protected post<T>(
    url: string,
    body: any,
    errorMessage: (error: HttpErrorResponse) => string,
    successMessage?: (response: T) => string
  ): Observable<T> {
    return this.pipeSnackbar(
      this.httpClient.post<T>(this.baseUrl + url, body),
      errorMessage,
      successMessage
    );
  }

  protected put<T>(
    url: string,
    body: any,
    errorMessage: (error: HttpErrorResponse) => string,
    successMessage?: (response: T) => string
  ): Observable<T> {
    return this.pipeSnackbar(
      this.httpClient.put<T>(this.baseUrl + url, body),
      errorMessage,
      successMessage
    );
  }

  protected delete<T>(
    url: string,
    confirmationModalDataDto: ConfirmationModalDataDto,
    errorMessage: (error: HttpErrorResponse) => string,
    successMessage?: (response: T) => string
  ): Observable<T> {
    const deleteWithSnackbar = this.pipeSnackbar(
      this.httpClient.delete<T>(this.baseUrl + url),
      errorMessage,
      successMessage
    );
    return this.preconcatConfirmationModal(
      confirmationModalDataDto,
      deleteWithSnackbar
    );
  }

  private pipeSnackbar<T>(
    observable: Observable<T>,
    errorMessage: (error: HttpErrorResponse) => string,
    successMessage?: (response: T) => string
  ): Observable<T> {
    return observable.pipe(
      tap({
        next: (response: T) => {
          if (successMessage)
            this.snackbar.open(successMessage(response), '', { duration: 300 });
        },
        error: (error) => this.snackbar.open(errorMessage(error)),
      } as PartialObserver<T>)
    );
  }

  private preconcatConfirmationModal<T>(
    confirmationModalDataDto: ConfirmationModalDataDto,
    observable: Observable<T>
  ): Observable<T> {
    return this.dialog
      .open(ConfirmationModal, { data: confirmationModalDataDto })
      .afterClosed()
      .pipe(
        concatMap((confirmation: boolean) => (confirmation ? observable : of()))
      );
  }
}
