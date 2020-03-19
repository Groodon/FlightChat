export interface BaseFlightComment {
  comment: string;
  userId: number;
  flightId: number;
  date: Date;
  tags?: Array<string>;
  hey: number;
}
