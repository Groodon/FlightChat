import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Comment from './Comment';
import Flight from './Flight';
import { CommentService } from './_services/comment-service';
import {MediaMatcher} from '@angular/cdk/layout';
import {FlightService} from './_services/flight-service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild('sidenav-container') sidenav: MatSidenav;
  flights: Flight[];
  title = 'FlightChat';
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  mobileQueryListener = () => {};

  constructor(
      private cs: CommentService,
      private fs: FlightService,
      private changeDetectorRef: ChangeDetectorRef,
      private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  getFlightComments(flightId) {
    // console.log(this.cs.getAll());
  }

  ngOnInit() {
    this.fs.getAllFlights().subscribe((data: Flight[]) => {
      this.flights = data;
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
