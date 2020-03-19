import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.sass']
})
export class FlightComponent implements OnInit {
  flightId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.flightId = +params.id;
    });
  }


}
