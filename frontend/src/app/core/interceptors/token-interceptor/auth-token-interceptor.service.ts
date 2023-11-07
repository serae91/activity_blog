import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/core/services/app-config/app-config.service';
import { TokenStorageService } from 'src/app/core/services/token-storage/token-storage.service';

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor {
  constructor(
    private tokenStorageService: TokenStorageService,
    private appConfig: AppConfigService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept loading icons request
    if (req.url.includes('assets')) {
      return next.handle(req);
    }
    if (req.url.includes('README.md')) {
      return next.handle(req);
    }

    if (req.url.includes('cas')) {
      return next.handle(req);
    }

    let url = this.appConfig.homepageUrl;

    const jwt: string | null = this.tokenStorageService.getAuthToken();
    // CASE: JWT exists
    if (req.url.split('.')[1] === 'json') {
      return next.handle(req);
    }
    let { headers } = req;
    if (jwt !== null) {
      headers = headers.append('Authorization', `Bearer ${jwt}`);
    }

    if (!req.url.startsWith('/') && !url.endsWith('/')) {
      url = `${url}/`;
    }

    const newRequest = req.clone({
      url: url + req.url,
      headers,
    });
    return next.handle(newRequest);
  }
}
