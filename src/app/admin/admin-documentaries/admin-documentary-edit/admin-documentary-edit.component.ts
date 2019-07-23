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
  documentary: Documentary;
  editDocumentaryForm: FormGroup;
  imgURL: any;
  wideImgURL: any;
  statuses: any;
  years: any;

  constructor(
    private route: ActivatedRoute,
    private documentaryService: DocumentaryService,
    private router: Router,
    private cd: ChangeDetectorRef) {
    }

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
      console.log(this.years);
      this.documentary = <Documentary> result[0];
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
  
  initForm() {
    let title = this.documentary.title;
    let slug = this.documentary.slug;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
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
    this.documentaryService.patch(this.editDocumentaryForm.value);
    console.log(this.editDocumentaryForm.value);
  }
}
