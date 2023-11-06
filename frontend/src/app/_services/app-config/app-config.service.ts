import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface AppConfig {
  version: string;
  homepage_api: string;
}

@Injectable()
export class AppConfigService {
  constructor(private http: HttpClient) {}

  private appConfigPath = 'assets/app-config/app-config.json';
  private configuration: AppConfig;

  async loadEnvironment(): Promise<boolean> {
    try {
      this.configuration = await (<Promise<AppConfig>>(
        this.http.get(this.appConfigPath).toPromise()
      ));
    } catch (err) {
      console.error(err);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  get homepageUrl(): string {
    return this.configuration ? this.configuration.homepage_api : '';
  }
}
