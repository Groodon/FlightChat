import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeUpdateComments = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onPostComment() {
    this.invokeUpdateComments.emit();
  }
}
