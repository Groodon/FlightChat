import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../_services/comment-service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {EventEmitterService} from '../_services/event-emitter.service';
import {FlightComment} from '../_interfaces/flight-comment';

@Component({
  selector: 'app-comment-field',
  templateUrl: './comment-field.component.html',
  styleUrls: ['./comment-field.component.sass']
})
export class CommentFieldComponent implements OnInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<Comment[]>();
  flightId: number;
  comments: FlightComment[];
  commentForm: FormGroup;
  commentsLoading = true;
  tags: Array<string> = [];

  constructor(private route: ActivatedRoute,
              private cs: CommentService,
              private formBuilder: FormBuilder,
              private eventEmitterService: EventEmitterService) { }


  ngOnInit() {
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeUpdateComments.subscribe(() => {
        this.updateComments().then(res => {
          this.commentsLoading = false;
        });
      });
    }

    this.route.params.subscribe((params) => {
      // Remove comments when switching flight
      this.comments = [];
      this.flightId = +params.id;
      this.commentForm = this.formBuilder.group({
        comment: [null, [Validators.required]]
      });
      this.updateComments().then(res => {
        this.commentsLoading = false;
      });
    });
  }

  async updateComments() {
    const promise = new Promise((resolve, reject) => {
      this.cs.getAllComments(this.flightId).subscribe((data: FlightComment[]) => {
        this.comments = data;
        resolve();
      });
    });
    return promise;
  }

  ngOnDestroy() {
  }
}
