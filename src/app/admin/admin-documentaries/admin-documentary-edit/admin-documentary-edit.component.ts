import { HttpParams } from '@angular/common/http';
import { VideoSourceService } from './../../../services/video-source.service';
import { Documentary } from './../../../models/documentary.model';
import { DocumentaryService } from './../../../services/documentary.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-documentary-edit',
  templateUrl: './admin-documentary-edit.component.html',
  styleUrls: ['./admin-documentary-edit.component.css']
})
export class AdminDocumentaryEditComponent implements OnInit {
  editDocumentaryForm: FormGroup;
  documentary: Documentary;
  imgURL: any;
  wideImgURL: any;
  statuses: any;
  years: any;
  videoSources: any;

  constructor(
    private route: ActivatedRoute,
    private documentaryService: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private router: Router,
    private cd: ChangeDetectorRef) {}

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
  };

  ngOnInit() {
    this.route.data.subscribe(result => {
      this.initStatuses();
      this.initYears();
      this.initVideoSources();
      this.documentary = <Documentary> result[0];
      console.log(this.documentary);
      this.initForm();
    })
  }

  initStatuses() {
    this.statuses = [
      {
        value: 'pending',
        name: 'Pending'
      },
      {
        value: 'publish',
        name: 'Published'
      }
    ];
  }

  initYears() {
    let currentYear = moment(new Date()).format('YYYY');

    let years = [];
    years.push(currentYear);

    let counter = 1;
    for (let i = +currentYear; i > 0; i--) {
      if (counter === 100) {
        break;
      }

      let year = i - 1;
      years.push(year);

      counter++;
    }

    this.years = years;
  }

  initVideoSources() {
    let params: HttpParams;
    this.videoSourceService.getAll(params)
      .subscribe(result => {
        this.videoSources = result;
        console.log(this.videoSources);
      });
  }
  
  initForm() {
    let title = this.documentary.title;
    let slug = this.documentary.slug;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let videoSource = this.documentary.video_source;
    console.log(videoSource);
    let year = this.documentary.year;
    let length = this.documentary.length;
    let status = this.documentary.status;
    let poster = 'http://localhost:8000/' + this.documentary.poster;
    this.imgURL = poster;
    let wideImage = 'http://localhost:8000/' + this.documentary.wide_image;
    console.log(wideImage);
    this.wideImgURL = wideImage;

    this.editDocumentaryForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'slug': new FormControl(slug, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'video_source': new FormControl(videoSource, [Validators.required]),
      'year': new FormControl(year, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wide_image': new FormControl(wideImage, [Validators.required])
    });

    this.editDocumentaryForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onPosterChange(event) {
    let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.editDocumentaryForm.patchValue({
        poster: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();

      this.imgURL = reader.result; 
    };
  }
  }

  onWideImageChange(event) {
    let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.editDocumentaryForm.patchValue({
        wide_image: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();

      this.wideImgURL = reader.result; 
    };
  }
  }

  onSubmit() {
    let documentaryId = this.documentary.id;
    let formValue = this.editDocumentaryForm.value;
    formValue.id = documentaryId;
    this.documentaryService.patchBySlug(formValue).subscribe(result => {
      this.router.navigate(["/admin/documentaries", this.documentary.slug]);
    });
    console.log(formValue);
  }
}
