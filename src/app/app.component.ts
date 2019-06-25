import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as MarkerActions from 'src/app/actions/marker.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  choice = 1;
  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    this.store.dispatch(MarkerActions.dbGetMarkers());
  }

  ngOnDestroy() {
    // this.store.dispatch({ type: 'CANCEL_GET_USERS' });
  }
}
