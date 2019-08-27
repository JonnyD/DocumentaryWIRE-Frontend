import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-comment-detail',
  templateUrl: './admin-comment-detail.component.html',
  styleUrls: ['./admin-comment-detail.component.css']
})
export class AdminCommentDetailComponent implements OnInit {
  comment: Comment;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.comment = <Comment> result[0];
    })
  }

}
