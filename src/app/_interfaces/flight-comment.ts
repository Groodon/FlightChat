import { BaseFlightComment } from './base-flight-comment';

export class FlightComment {
  _id: string;
  comment: string;
  userId: number;
  flightId: number;
  date: Date;
  tags?: Array<string>;

  constructor(baseComment: BaseFlightComment) {
    // TODO: Better way to do this?
    this._id = baseComment._id;
    this.comment = baseComment.comment;
    this.userId = baseComment.userId;
    this.flightId = baseComment.flightId;
    this.date = new Date(baseComment.date);
    this.tags = baseComment.tags;
  }
}
