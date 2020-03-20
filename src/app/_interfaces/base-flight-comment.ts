export interface BaseFlightComment {
  _id: string;
  comment: string;
  userId: number;
  flightId: number;
  date: Date;
  tags?: Array<string>;
}
