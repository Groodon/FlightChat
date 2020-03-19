import {Component, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../_services/comment-service';
import {FormGroup, Validators, FormBuilder, FormGroupDirective} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {EventEmitterService} from '../_services/event-emitter.service';
import {FlightComment} from '../_interfaces/flight-comment';



@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.sass']
})
export class CommentFormComponent implements OnInit, OnDestroy {
  flightId: number;
  comments: FlightComment[];
  commentForm: FormGroup;

  selectable = true;
  removable = true;
  addOnBlur = true;
  addCommentLoading = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Array<string> = [];

  constructor(private route: ActivatedRoute,
              private cs: CommentService,
              private formBuilder: FormBuilder,
              private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.flightId = +params.id;
      this.commentForm = this.formBuilder.group({
        comment: [null, [Validators.required]]
      });
    });
  }

  ngOnDestroy() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.commentForm.controls; }

  disableForm() {
    this.commentForm.disable();
    this.addCommentLoading = true;
  }

  enableForm() {
    this.commentForm.enable();
    this.addCommentLoading = false;
  }

  submitComment(formDirective: FormGroupDirective) {
    if (this.commentForm.valid) {
      this.disableForm();
      const comment = {comment: this.f.comment.value, flightId: this.flightId, userId: 99, tags: this.tags};
      this.cs.postComment(comment)
        .subscribe(() => {
            // When posting a comment, let other components that need to be update know
            this.enableForm();
            this.eventEmitterService.onPostComment();
            this.commentForm.controls.comment.reset();
            formDirective.resetForm();
            this.tags = [];
          },
          error => {
            this.enableForm();
            console.log(error);
          });
    } else {
      // This is to make the error text show up on the comment field.
      this.commentForm.controls.comment.markAsTouched();
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const trimmedValue = (value || '').trim();
    // Add our tag
    if (trimmedValue && !this.tags.includes(trimmedValue)) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
