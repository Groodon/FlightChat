import { BaseFlightComment } from './base-flight-comment';

export class FlightComment {
  comment: string;
  userId: number;
  flightId: number;
  date: Date;
  tags?: Array<string>;

  constructor(baseComment: BaseFlightComment) {
    // TODO: Better way to do this?
    this.comment = baseComment.comment;
    this.userId = baseComment.userId;
    this.flightId = baseComment.flightId;
    this.date = new Date(baseComment.date);
    this.tags = baseComment.tags;
  }
}
