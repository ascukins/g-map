import { Component } from '@angular/core';
import { GmapService } from './services/gmap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  choice = 0;
  constructor(public gmapService: GmapService) { }
}
