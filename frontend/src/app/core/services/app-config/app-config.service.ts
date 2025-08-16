import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';

export interface AppConfig {
  version: string;
  apiURL: string;
}

@Injectable()
export class AppConfigService {
  constructor(private http: HttpClient) {}

  private appConfigPath = 'assets/app-config/app-config.json';
  private configuration = {} as AppConfig;

  loadEnvironment(): void {
    /*try {
      this.configuration = await (<Promise<AppConfig>>(
        this.http.get(this.appConfigPath).toPromise()
      ));
    } catch (err) {
      console.error(err);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);*/
    this.configuration.apiURL = environment.apiUrl;
  }

  get apiUrl(): string {
    return this.configuration ? this.configuration.apiURL : ''; //hier in k8s andere URL
  }
}
