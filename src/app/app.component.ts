import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Flight} from './_interfaces/flight';
import { CommentService } from './_services/comment-service';
import {MediaMatcher} from '@angular/cdk/layout';
import {FlightService} from './_services/flight-service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav-container') sidenav: MatSidenav;
  flights: Flight[];
  title = 'FlightChat';
  mobileQuery: MediaQueryList;
  mobileQueryListener = () => {};

  constructor(
      private cs: CommentService,
      private fs: FlightService,
      private changeDetectorRef: ChangeDetectorRef,
      private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.fs.getAllFlights().subscribe((data: Flight[]) => {
      this.flights = data;
    });
  }
}
