import { DocumentaryService } from './../../../services/documentary.service';
import { YearService } from './../../../services/year.service';
import { CategoryService } from './../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../../models/documentary.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideoSourceService } from 'src/app/services/video-source.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentary-add',
  templateUrl: './documentary-add.component.html',
  styleUrls: ['./documentary-add.component.css']
})
export class DocumentaryAddComponent implements OnInit {
  public documentary: Documentary;
  public categories;
  public years;
  public videoSources;
  public posterImgURL;
  public wideImgURL;

  public showStandaloneForm:boolean = false;
  public showAddTitleButton = true;

  standaloneForm: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
  };

  constructor(
    private categoryService: CategoryService,
    private yearService: YearService,
    private videoSourceService: VideoSourceService,
    private documentaryService: DocumentaryService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.documentary = new Documentary();
  }

  toggleStandaloneForm() {
    this.showAddTitleButton = false;

    this.showStandaloneForm = !this.showStandaloneForm;

    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initStandaloneForm();
  }

  initYears() {
    this.years = this.yearService.getAllYearsForForm();
  }

  initVideoSources() {
    let params: HttpParams;
    this.videoSourceService.getAll(params)
      .subscribe(result => {
        this.videoSources = result;
        console.log(result);
      });
  }

  initCategories() {
    let params: HttpParams;
    this.categoryService.getAll(params)
      .subscribe(result => {
        this.categories = result;
      });
  }

  initStandaloneForm() {
    let title = this.documentary.title;
    let category = this.documentary.category;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let videoSource = this.documentary.videoSource;
    let videoId = this.documentary.videoId;
    let year = this.documentary.year;
    let length = this.documentary.length;
    let poster = this.documentary.poster;
    let wideImage = this.documentary.wideImage;

    this.standaloneForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'videoSource': new FormControl(videoSource, [Validators.required]),
      'videoId': new FormControl(videoId, [Validators.required]),
      'year': new FormControl(year, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required])
    });
  }

  onPosterChange(event) {
    let reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.standaloneForm.patchValue({
          poster: reader.result
        });
        
        this.cd.markForCheck();

        this.posterImgURL = reader.result; 
      };
    }
  }
  
  onWideImageChange(event) {
    let reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.standaloneForm.patchValue({
          wideImage: reader.result
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

        this.wideImgURL = reader.result; 
      };
    }
  }

  onSubmit() {
    let formValue = this.standaloneForm.value;
    console.log(formValue);
    this.documentaryService.createUserDocumentary(formValue).subscribe((result: any) => {
      console.log(result);
      
    },
    (error) => {
      console.log(error);
    });
  }
}
