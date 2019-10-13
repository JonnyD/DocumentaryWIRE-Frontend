import { YoutubeService } from './../../../services/youtube.service';
import { UserService } from './../../../services/user.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { YearService } from './../../../services/year.service';
import { CategoryService } from './../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../../models/documentary.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VideoSourceService } from 'src/app/services/video-source.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMDB } from 'src/app/models/imdb.model';
import { OMDBService } from 'src/app/services/omdb.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-documentary-add',
  templateUrl: './documentary-add.component.html',
  styleUrls: ['./documentary-add.component.css']
})
export class DocumentaryAddComponent implements OnInit {
  public slug;

  public editMode = false;

  public documentary: Documentary;
  public categories;
  public years;
  public videoSources;
  public posterImgURL;
  public wideImgURL;
  public imdb: IMDB;

  private queryParamsSubscription;
  private routeParamsSubscription;
  public documentaryBySlugSubscription;
  private meSubscription;

  public myStandaloneDocumentaries;
  public showStandaloneDocumentaries = false;

  public showStandaloneForm:boolean = false;
  public standaloneFormLoaded = false;
  public showAddTitleButton = true;

  public showSearchedDocumentariesFromIMDB = false;
  public showSearchedDocumentaryFromIMDB = false;

  public isFetchingDocumentariesFromIMDB = false;
  public isFetchingDocumentaryFromIMDB = false;

  public searchedDocumentariesFromIMDB;
  public searchedDocumentaryFromIMDB;

  public searchedVideosFromYoutube;
  public isFetchingVideosFromYoutube = true;
  public showSearchedVideosFromYoutube = false;

  public isFetchingStandaloneDocumentaries = false;
  public isFetchingYears = false;
  public isFetchingVideoSources = false;
  public isFetchingCategories = false;
  
  public HasToggledStandaloneForm = false;

  standaloneForm: FormGroup;
  imdbForm: FormGroup;
  youtubeForm: FormGroup;

  config: any;
  page;
  me;

  closeResult: string;

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
    private omdbService: OMDBService,
    private userService: UserService,
    private youtubeService: YoutubeService,
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.documentary = new Documentary();

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
          this.slug = params['params']['slug'];
          this.editMode = this.slug != null;

          if (this.editMode) {
            this.documentaryService.getDocumentaryBySlug(this.slug)
              .subscribe((result:any) => {
                this.documentary = result;

                this.toggleStandaloneForm();
              });
          } else {
            this.meSubscription = this.userService.getMe().subscribe(me => {
              this.me = me;

              if (!this.HasToggledStandaloneForm) {
                this.fetchStandaloneDocumentaries();
              }
            });
          }
        });
      });
  }

  fetchStandaloneDocumentaries() {
    if (this.editMode) {
      this.showStandaloneDocumentaries = false;
      return;
    }

    this.isFetchingStandaloneDocumentaries = true;

    this.showStandaloneDocumentaries = true;

    let params = new HttpParams();

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    this.documentaryService.getMyStandloneDocumentaries(params, this.me.username)
      .subscribe(result => {
        this.config = {
          itemsPerPage: 5,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.myStandaloneDocumentaries = result['items'];

        this.isFetchingStandaloneDocumentaries = false;
      })
  }

  toggleStandaloneForm() {
    console.log("toggle");
    this.showAddTitleButton = false;

    this.showStandaloneDocumentaries = false;

    this.showStandaloneForm = !this.showStandaloneForm;

    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initStandaloneForm();

    this.HasToggledStandaloneForm = true;
  }

  initYears() {
    this.isFetchingYears = true;

    this.years = this.yearService.getAllYearsForForm();

    this.isFetchingYears = false;
  }

  initVideoSources() {
    this.isFetchingVideoSources = true;

    let params: HttpParams;
    this.videoSourceService.getAll(params)
      .subscribe(result => {
        this.videoSources = result;
        
        this.isFetchingVideoSources = false;
      });
  }

  initCategories() {
    this.isFetchingCategories = true;

    let params: HttpParams;
    this.categoryService.getAll(params)
      .subscribe(result => {
        this.categories = result;

        this.isFetchingCategories = false;
      });
  }

  initStandaloneForm() {
    let title = this.documentary.title;
    let category = null;
    if (this.documentary.category) {
      category = this.documentary.category.id;
    }
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let videoSource = null;
    if (this.documentary.videoSource) {
      videoSource = this.documentary.videoSource.id
    }
    let videoId = this.documentary.videoId;
    let year = this.documentary.year;
    let length = this.documentary.length;
    let poster = this.documentary.poster;
    this.posterImgURL = this.documentary.poster;
    let wideImage = this.documentary.wideImage;
    this.wideImgURL = this.documentary.wideImage;
    let imdbId = this.documentary.imdbId;

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
      'wideImage': new FormControl(wideImage, [Validators.required]),
      'imdbId': new FormControl(imdbId, [Validators.required])
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

  initIMDBFrom() {
    let title = this.standaloneForm.value.title;

    this.imdbForm = new FormGroup({
      'title': new FormControl(title, [Validators.required])
    });

    if (title) {
      this.searchOMDB();
    }
  }

  initYoutubeForm() {
    let title = this.standaloneForm.value.title;

    this.youtubeForm = new FormGroup({
      'title': new FormControl(title, [Validators.required])
    });

    if (title) {
      this.searchYoutube();
    }
  }

  openIMDBModal(content) {
    this.initIMDBFrom();
    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-omdb'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  openYoutubeModal(content) {
    this.initYoutubeForm();

    this.modalService.open(content, {ariaLabelledBy: 'modal-youtube'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  imdbView(imdbId) {
    this.isFetchingDocumentaryFromIMDB = true;
    this.showSearchedDocumentariesFromIMDB = false;
    this.showSearchedDocumentaryFromIMDB = true;

    this.omdbService.getByImdbId(imdbId)
      .subscribe((result: any) => {
        this.searchedDocumentaryFromIMDB = result;
        this.isFetchingDocumentaryFromIMDB = false;
      })
  }

  imdbSelect(selectedDocumentary) {
    this.modalService.dismissAll();

    this.documentary.title = selectedDocumentary.title;

    if (this.documentary.imdbId != selectedDocumentary.imdbId) {
      this.documentary.imdbId = selectedDocumentary.imdbId;
      this.documentary.storyline = selectedDocumentary.plot;
      this.documentary.year = selectedDocumentary.year;
      this.documentary.length = selectedDocumentary.duration;
      this.documentary.poster = selectedDocumentary.poster;
      this.posterImgURL = selectedDocumentary.poster;
    }

    this.initStandaloneForm();
  }

  youtubeSelect(selectedVideo) {
    this.modalService.dismissAll();

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

    this.documentary.videoId = selectedVideo.id.videoId;

    this.initStandaloneForm();
  }

  searchOMDB() {
    this.isFetchingDocumentariesFromIMDB = true;
    this.showSearchedDocumentaryFromIMDB = false;
    this.showSearchedDocumentariesFromIMDB = true;

    let title = this.imdbForm.value.title;
    this.omdbService.getSearchedDocumentaries(title)
      .subscribe((result: any) => {
        this.searchedDocumentariesFromIMDB = result['Search'];
        this.isFetchingDocumentariesFromIMDB = false;
      });
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

  onSubmit() {
    let formValue = this.standaloneForm.value;
    formValue.type = "standalone";

    if (this.editMode) {
      this.documentaryService.update(formValue, {})
        .subscribe((result: any) => {
        });
    } else {
      this.documentaryService.createUserDocumentary(formValue)
        .subscribe((result: any) => {
          console.log(result);
      },
      (error) => {
        console.log(error);
      });
    }
    
  }
  
  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchStandaloneDocumentaries();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
    this.meSubscription.unsubscribe();
  }
}
