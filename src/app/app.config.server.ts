import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverOnlyConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const serverConfig = mergeApplicationConfig(appConfig, serverOnlyConfig);
