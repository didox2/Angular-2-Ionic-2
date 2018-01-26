import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { EstatesApiProvider } from "../providers/estates-api/estates-api";
import { PipesModule } from '../pipes/pipes.module';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';

import {
  EstateHomePage,
  LocationsPage,
  EstatesPage,
  MyEstatesPage,
  OverviewPage,
  MapPage,
  SimilarPage
} from "../pages/pages";

import { MyApp } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { UserSettingsProvider } from '../providers/user-settings/user-settings';

@NgModule({
  declarations: [
    MyApp,
    EstateHomePage,
    LocationsPage,
    EstatesPage,
    MyEstatesPage,
    OverviewPage,
    MapPage,
    SimilarPage
  ],
  imports: [
    PipesModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAknvATkcL0yuO47E6DhDc96NTiz6JbuY4'
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstateHomePage,
    LocationsPage,
    EstatesPage,
    MyEstatesPage,
    OverviewPage,
    MapPage,
    SimilarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EstatesApiProvider,
    UserSettingsProvider
  ]
})
export class AppModule {}