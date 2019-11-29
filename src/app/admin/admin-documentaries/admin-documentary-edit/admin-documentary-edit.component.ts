import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from './../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { VideoSourceService } from './../../../services/video-source.service';
import { Documentary } from './../../../models/documentary.model';
import { DocumentaryService } from './../../../services/documentary.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { OMDBService } from 'src/app/services/omdb.service';

@Component({
  selector: 'app-admin-documentary-edit',
  templateUrl: './admin-documentary-edit.component.html',
  styleUrls: ['./admin-documentary-edit.component.css']
})
export class AdminDocumentaryEditComponent implements OnInit {
  editDocumentaryForm: FormGroup;
  imdbForm: FormGroup;
  documentary: Documentary;
  posterImgURL: any;
  wideImgURL: any;
  statuses: any;
  years: any;
  videoSources: any;
  categories: any;
  submitted = false;
  closeResult: string;
  
  public isFetchingDocumentariesFromIMDB = false;
  public showSearchedDocumentaryFromIMDB = false;
  public showSearchedDocumentariesFromIMDB = false;
  public isFetchingDocumentaryFromIMDB = false;
  public searchedDocumentariesFromIMDB;
  public searchedDocumentaryFromIMDB;

  constructor(
    private route: ActivatedRoute,
    private documentaryService: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
    private omdbService: OMDBService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal) {}

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
    
    console.log("Here2");
    this.route.data.subscribe(result => {
      this.initStatuses();
      this.initYears();
      this.initVideoSources();
      this.initCategories();
      this.documentary = <Documentary> result[0];
      this.initForm();
      console.log("this.documentary");
      console.log(this.documentary);
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
        console.log("this.videoSources");
        console.log(this.videoSources);
      });
  }
  
  initCategories() {
    let params: HttpParams;
    this.categoryService.getAll(params)
      .subscribe(result => {
        this.categories = result;
        console.log(result);
      });
  }
  
  initForm() {
    let title = this.documentary.title;
    let slug = this.documentary.slug;
    let category = this.documentary.category.id;
    console.log("category");
    console.log(category);
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let imdbId = this.documentary.imdbId;
    let videoSource = this.documentary.standalone.videoSource.id;
    let videoId = this.documentary.standalone.videoId;
    //console.log(videoSource);
    let year = this.documentary.year;
    let length = this.documentary.length;
    let status = this.documentary.status;
    let poster = this.documentary.poster;
    this.posterImgURL = poster;
    console.log("this.posterImgURL");
    console.log(this.posterImgURL);
    let wideImage = this.documentary.wideImage;
    //console.log(wideImage);
    this.wideImgURL = wideImage;
    console.log(this.wideImgURL);

    console.log("this.documentary");
    console.log(this.documentary);

    this.editDocumentaryForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'slug': new FormControl(slug, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'year': new FormControl(year, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required]),
      'imdbId': new FormControl(imdbId),
      'standalone': new FormGroup({
        'videoId': new FormControl(videoId, [Validators.required]),
        'videoSource': new FormControl(videoSource, [Validators.required])
      }),
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
      this.editDocumentaryForm.patchValue({
        wideImage: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();

      this.wideImgURL = reader.result; 
    };
  }
  }

  openIMDBModal(content) {
    this.initIMDBFrom();
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-omdb'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  initIMDBFrom() {
    let title = this.documentary.title;

    this.imdbForm = new FormGroup({
      'title': new FormControl(title, [Validators.required])
    });

    if (title) {
      this.searchOMDB();
    }
  }

  searchOMDB() {
    this.isFetchingDocumentariesFromIMDB = true;
    this.showSearchedDocumentaryFromIMDB = false;
    this.showSearchedDocumentariesFromIMDB = true;

    let title = this.imdbForm.value.title;
    let imdbType = 'movie';
    
    this.omdbService.getSearchedDocumentaries(title, imdbType)
      .subscribe((result: any) => {
        console.log(result);
        this.searchedDocumentariesFromIMDB = result['Search'];
        this.isFetchingDocumentariesFromIMDB = false;
      });
  }
  
  imdbView(imdbId) {
    console.log("imdbId");
    console.log(imdbId);
    this.isFetchingDocumentaryFromIMDB = true;
    this.showSearchedDocumentariesFromIMDB = false;
    this.showSearchedDocumentaryFromIMDB = true;

    this.omdbService.getByImdbId(imdbId, 'movie')
      .subscribe((result: any) => {
        this.searchedDocumentaryFromIMDB = result;
        this.isFetchingDocumentaryFromIMDB = false;
        console.log("searchedDocumentaryFromIMDB");
        console.log(this.searchedDocumentaryFromIMDB);
      })
  }

  imdbSelect(selectedDocumentary) {
    console.log("selectedDocumentary");
    console.log(selectedDocumentary);

    if (this.documentary.imdbId != selectedDocumentary.imdbId) {
      this.documentary.imdbId = selectedDocumentary.imdbId;
      if (this.documentary.title == null) {
        this.documentary.title = selectedDocumentary.title;
      }
      if (this.documentary.storyline == null) {
        this.documentary.storyline = selectedDocumentary.storyline;
      }
      if (this.documentary.year == null) {
        this.documentary.year = selectedDocumentary.year;
      }
      if (this.documentary.poster == null) {
        this.documentary.poster = selectedDocumentary.poster;
        this.posterImgURL = selectedDocumentary.poster;
      }
      if (this.documentary.category == null) {
        this.documentary.category = selectedDocumentary.category;
      }
    }

      this.initForm();
      this.modalService.dismissAll();  
  }

  onSubmit() {
    this.submitted = true;

    let documentaryId = this.documentary.id;
    let formValue = this.editDocumentaryForm.value;

    console.log("formValue");
    console.log(formValue);

    if (this.editDocumentaryForm.valid) {
      this.documentaryService.editStandaloneDocumentary(documentaryId, formValue).subscribe(result => {
        console.log(result);
       // this.router.navigate(["/admin/documentaries", this.documentary.slug]);
      }, error => {
        console.log(error);
      });
    }
  }
}
