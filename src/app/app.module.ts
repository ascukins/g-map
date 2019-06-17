import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule,  MatButtonToggleModule, MatToolbarModule,
  MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './components/gmap/gmap.component';
import { GmapService } from './services/gmap.service';
import { MarkerListComponent } from './components/marker-list/marker-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/marker.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MarkerEffects } from './effects/marker.effects';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    GmapComponent,
    MarkerListComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapApiKey,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot({
      markers: reducer,
    }),
    EffectsModule.forRoot([MarkerEffects]),
  ],
  providers: [GmapService],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor() { }
 }
