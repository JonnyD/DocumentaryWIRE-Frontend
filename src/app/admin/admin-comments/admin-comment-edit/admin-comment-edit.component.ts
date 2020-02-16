import { CommnentService } from 'src/app/services/comment.service';
import { Comment } from './../../../models/comment.model';
import { Status } from './../../../models/status.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-comment-edit',
  templateUrl: './admin-comment-edit.component.html',
  styleUrls: ['./admin-comment-edit.component.css']
})
export class AdminCommentEditComponent implements OnInit {
  editCommentForm: FormGroup;

  comment: Comment;

  public statuses = [
    { id: 'published', name: 'Published' },
    { id: 'pending', name: 'Pending' },
    { id: 'rejected', name: 'Rejected' }
  ];

  constructor(
    private commentService: CommnentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.comment = <Comment> result[0];

      this.initForm();
    })
  }

  initForm() {
    let commentText = this.comment.commentText;
    let status = this.comment.status;

    this.editCommentForm = new FormGroup({
      'commentText': new FormControl(commentText, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
    });
  }
  
  onSubmit() {
    let commentId = this.comment.id;
    let formValue = this.editCommentForm.value;

    this.commentService.editComment(commentId, formValue).subscribe(result => {
      console.log(result);
      this.router.navigate(["/admin/comments", commentId]);
    });
  }
}
