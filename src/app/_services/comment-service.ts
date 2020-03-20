import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FlightComment} from '../_interfaces/flight-comment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) { }

  getAllComments(flightId): Observable<Array<FlightComment>> {
    return this.http.get<Array<FlightComment>>(`http://localhost:3000/comment/get/${flightId}`)
      .pipe(map((comments: FlightComment[]) => comments.map(comment => new FlightComment(comment))));;
  }

  postComment(comment): Observable<FlightComment> {
    return this.http.post<FlightComment>(`http://localhost:3000/comment/post`, comment);
  }
}
