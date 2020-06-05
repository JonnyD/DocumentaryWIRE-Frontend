import { FeaturedService } from './../../../services/featured.service';
import { Movie } from './../../../models/movie.model';
import { StatusService } from './../../../services/status.service';
import { VideoSource } from './../../../models/video-source.model';
import { Standalone } from './../../../models/standalone.model';
import { YearService } from './../../../services/year.service';
import { YoutubeService } from './../../../services/youtube.service';
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
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-standalone-edit',
  templateUrl: './admin-standalone-edit.component.html',
  styleUrls: ['./admin-standalone-edit.component.css']
})
export class AdminStandaloneEditComponent implements OnInit {
  editDocumentaryForm: FormGroup;
  imdbForm: FormGroup;
  youtubeForm: FormGroup;
  documentary: Documentary;
  posterImgURL: any;
  wideImgURL: any;
  statuses: any;
  years: any;
  videoSources: any;
  categories: any;
  submitted = false;
  closeResult: string;
  featuredOptions: any;

  private editMode = false;
  
  public isFetchingDocumentariesFromIMDB = false;
  public showSearchedDocumentaryFromIMDB = false;
  public showSearchedDocumentariesFromIMDB = false;
  public isFetchingDocumentaryFromIMDB = false;
  public searchedDocumentariesFromIMDB;
  public searchedDocumentaryFromIMDB;

  public searchedVideosFromYoutube;
  public isFetchingVideosFromYoutube = true;
  public showSearchedVideosFromYoutube = false;

  private queryParamsSubscription;
  private routeParamsSubscription;
  private documentaryBySlugSubscription;

  constructor(
    private route: ActivatedRoute,
    private documentaryService: DocumentaryService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
    private omdbService: OMDBService,
    private youtubeService: YoutubeService,
    private yearService: YearService,
    private statusService: StatusService,
    private featuredService: FeaturedService,
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
    this.initModel();

    this.initStatuses();
    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initFeatured();
    
    this.initForm();

    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
        let slug = params['params']['slug'];
        console.log("slug");
        console.log(slug);
        this.editMode = slug != null;
        console.log("this.editMode");
        console.log(this.editMode);

        if (this.editMode) {
          this.documentaryBySlugSubscription = this.documentaryService.getDocumentaryBySlug(slug)
            .subscribe((result:any) => {
              this.documentary = result;
              console.log("this.documentary");
              console.log(this.documentary);
              this.initForm();
            });
        }

    });
  }

  initModel() {
    this.documentary = new Documentary();
    let movie = new Movie();
    this.documentary.movie = movie;
  }
  
  initFeatured() {
    this.featuredOptions = this.featuredService.getFeaturedOptions();
  }

  initStatuses() {
    this.statuses = this.statusService.getAllStatuses();
  }

  initYears() {
    this.years = this.yearService.getAllYearsForForm();
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
    let category = this.documentary.category;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let videoSource = this.documentary.movie.videoSource;
    let videoId = this.documentary.movie.videoId;
    let yearFrom = this.documentary.yearFrom;
    let length = this.documentary.length;
    let poster = this.documentary.poster;
    this.posterImgURL = this.documentary.poster;
    let wideImage = this.documentary.wideImage;
    this.wideImgURL = this.documentary.wideImage;
    let imdbId = this.documentary.imdbId;
    let featured = this.documentary.featured;

    console.log("this.documentary");
    console.log(this.documentary);
    console.log("featured");
    console.log(this.documentary.featured);

    this.editDocumentaryForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'slug': new FormControl(slug, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'yearFrom': new FormControl(yearFrom, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required]),
      'featured': new FormControl(featured, [Validators.required]),
      'imdbId': new FormControl(imdbId),
      'movie': new FormGroup({
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
      if (this.documentary.yearFrom == null) {
        this.documentary.yearFrom = selectedDocumentary.year;
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

  openYoutubeModal(content) {
    this.initYoutubeForm();

    this.modalService.open(content, {ariaLabelledBy: 'modal-youtube'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  initYoutubeForm() {
    let title = this.documentary.title;

    this.youtubeForm = new FormGroup({
      'title': new FormControl(title, [Validators.required])
    });

    if (title) {
      this.searchYoutube();
    }
  }

  searchYoutube() {
    this.isFetchingVideosFromYoutube = true;
    this.showSearchedVideosFromYoutube = true;

    let title = this.youtubeForm.value.title;
    this.youtubeService.getSearchedDocumentaries(title)
      .subscribe((result: any) => {
        this.searchedVideosFromYoutube = result['items'];
        this.isFetchingVideosFromYoutube = false;
      });
  }

  youtubeSelect(selectedVideo) {
    if (!this.documentary.title) {
      this.documentary.title = selectedVideo.snippet.title;
    }

    if (!this.documentary.storyline) {
      this.documentary.storyline = selectedVideo.snippet.description;
    }

    if (!this.documentary.wideImage) {
      this.documentary.wideImage = selectedVideo.snippet.thumbnails.high.url;
      this.wideImgURL = selectedVideo.snippet.thumbnails.high.url;
    }

    this.documentary.movie.videoId = selectedVideo.id.videoId;

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
      if (this.editMode) {
          this.documentaryService.editStandaloneDocumentary(documentaryId, formValue)
          .subscribe((result: any) => {
            console.log(result);
            this.router.navigate(["/admin/documentaries/standalone", result.slug]);
        }, error => {
            console.log(error);
        });
      } else {
        this.documentaryService.createStandaloneDocumentary(formValue)
          .subscribe((result: any) => {
            console.log("created result");
            console.log(result);
            this.router.navigate(["/admin/documentaries/standalone", result.slug]);
          }, error => {
            console.log(error);
          })
      }
    }
  }

  convertToSeries() {
    console.log("convert to series");
    this.documentaryService.convertToSeries(this.documentary)
      .subscribe((result: any) => {
        console.log("convert to series result");
        console.log(result);
        this.router.navigate(["/admin/documentaries/series", result.slug]);
      });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    if (this.documentaryBySlugSubscription != null) {
      this.documentaryBySlugSubscription.unsubscribe();
    }
  }
}
