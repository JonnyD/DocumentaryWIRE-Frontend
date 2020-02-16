import { YearService } from 'src/app/services/year.service';
import { catchError } from 'rxjs/operators';
import { CategoryService } from './../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { VideoSourceService } from './../../../services/video-source.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Documentary } from './../../../models/documentary.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-documentaries-add',
  templateUrl: './admin-documentaries-add.component.html',
  styleUrls: ['./admin-documentaries-add.component.css']
})
export class AdminDocumentariesAddComponent implements OnInit {
  addDocumentaryForm: FormGroup;
  documentary: Documentary;
  posterImgURL: any;
  wideImgURL: any;
  statuses: any;
  years: any;
  videoSources: any;
  categories: any;

  constructor(
    private route: ActivatedRoute,
    private documentaryService: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
    private yearService: YearService,
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
    this.documentary = new Documentary();

    this.initStatuses();
    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initForm();
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
    this.years = this.yearService.getAllYearsForForm();
  }

  initVideoSources() {
    let params: HttpParams;
    this.videoSourceService.getAll(params)
      .subscribe(result => {
        this.videoSources = result;
      });
  }

  initCategories() {
    let params: HttpParams;
    this.categoryService.getAll(params)
      .subscribe(result => {
        this.categories = result;
      });
  }
  
  initForm() {
    let title = this.documentary.title;
    let slug = this.documentary.slug;
    let category = this.documentary.category;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let videoSource = this.documentary.movie.videoSource;
    let videoId = this.documentary.movie.videoId;
    let year = this.documentary.yearFrom;
    let length = this.documentary.length;
    let status = this.documentary.status;
    let poster = this.documentary.poster;
    let wideImage = this.documentary.wideImage;

    this.addDocumentaryForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'slug': new FormControl(slug, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'videoSource': new FormControl(videoSource, [Validators.required]),
      'videoId': new FormControl(videoId, [Validators.required]),
      'year': new FormControl(year, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required])
    });

    this.addDocumentaryForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onPosterChange(event) {
    let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.addDocumentaryForm.patchValue({
        poster: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();

      this.posterImgURL = reader.result; 
    };
  }
  }

  onWideImageChange(event) {
    let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.addDocumentaryForm.patchValue({
        wideImage: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();

      this.wideImgURL = reader.result; 
    };
  }
  }

  onSubmit() {
    let formValue = this.addDocumentaryForm.value;
    console.log(formValue);
    this.documentaryService.createStandaloneDocumentary(formValue).subscribe((result: any) => {
      console.log(result);
      this.router.navigate(["/admin/documentaries",  result.slug]);
    },
    (error) => {
      console.log(error);
    });
  }
}
