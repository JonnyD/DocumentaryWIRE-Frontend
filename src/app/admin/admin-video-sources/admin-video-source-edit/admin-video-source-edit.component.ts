import { VideoSource } from 'src/app/models/video-source.model';
import { VideoSourceService } from './../../../services/video-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-video-source-edit',
  templateUrl: './admin-video-source-edit.component.html',
  styleUrls: ['./admin-video-source-edit.component.css']
})
export class AdminVideoSourceEditComponent implements OnInit {

  editVideoSourceForm: FormGroup;
  videoSource: VideoSource;
  embedAllowedOptions: any;
  statusOptions: any;

  constructor(
    private route: ActivatedRoute,
    private videoSourceService: VideoSourceService,
    private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.videoSource = <VideoSource> result[0];
      this.initEmbedAllowedOptions();
      this.initStatusOptions();
      this.initForm();
    })
  }

  initEmbedAllowedOptions() {
    this.embedAllowedOptions = ["yes", "no"];
  }

  initStatusOptions() {
    this.statusOptions = ["enabled", "disabled"];
  }
  
  initForm() {
    let name = this.videoSource.name;
    let embedAllowed = this.videoSource.embedAllowed;
    let embedCode = this.videoSource.embedCode;
    let status = this.videoSource.status;

    this.editVideoSourceForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'embedAllowed': new FormControl(embedAllowed, [Validators.required]),
      'embedCode': new FormControl(embedCode),
      'status': new FormControl(status, [Validators.required])
    });

    this.editVideoSourceForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit() {
    let videoSourceId = this.videoSource.id;
    let formValue = this.editVideoSourceForm.value;
    this.videoSourceService.editVideoSource(videoSourceId, formValue)
      .subscribe(result => {
        this.router.navigate(["admin/video-sources", videoSourceId]);
      });
  }

}
