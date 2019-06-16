import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  choice = 1;
  constructor(private store: Store<AppState>) {
//    this.store.dispatch({type: 'GET_MARKERS'});
  }

ngOnDestroy() {
 // this.store.dispatch({ type: 'CANCEL_GET_USERS' });
}
}
