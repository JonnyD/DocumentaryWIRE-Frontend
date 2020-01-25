import { VideoSource } from './../../../../models/video-source.model';
import { YoutubeService } from './../../../../services/youtube.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OMDBService } from './../../../../services/omdb.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Standalone } from './../../../../models/standalone.model';
import { UserService } from './../../../../services/user.service';
import { DocumentaryService } from './../../../../services/documentary.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { CategoryService } from './../../../../services/category.service';
import { VideoSourceService } from './../../../../services/video-source.service';
import { YearService } from './../../../../services/year.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Documentary } from 'src/app/models/documentary.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-documentary-add-standalone',
  templateUrl: './documentary-add-standalone.component.html',
  styleUrls: ['./documentary-add-standalone.component.css']
})
export class DocumentaryAddStandaloneComponent implements OnInit {

  private documentary: Documentary;

  private page;
  private slug;

  private editMode = false;

  private form: FormGroup;
  private submitted = false;
  private errors = null;

  private imdbForm: FormGroup;
  private youtubeForm: FormGroup;

  private posterImgURL;
  private wideImgURL;

  private showAddTitleButton = false;
  private showDocumentaries = false;
  private showForm = false;
  private hasToggledForm = false;
  private showPage = false;

  private isFetchingYears = false;
  private isFetchingVideoSources = false;
  private isFetchingCategories = false;
  private isFetchingDocumentaries = false;

  private showSearchedDocumentariesFromIMDB = false;
  private showSearchedDocumentaryFromIMDB = false;
  private isFetchingDocumentariesFromIMDB = false;
  private isFetchingDocumentaryFromIMDB = false;
  private searchedDocumentariesFromIMDB;
  private searchedDocumentaryFromIMDB;

  private isFetchingVideosFromYoutube = false;
  private showSearchedVideosFromYoutube = false;
  private searchedVideosFromYoutube;

  private years;
  private videoSources;
  private categories;

  private myDocumentaries;

  private me;

  private queryParamsSubscription;
  private routeParamsSubscription;
  private documentaryBySlugSubscription;
  private meSubscription;
  private videoSourcesSubscription;
  private categoriesSubscription;
  private getByImdbIdSubscription;
  private ombdSearchSubscription;
  private youtubeSearchSubscription;
  private youtubeByIdSubscription;

  private config: any;

  private closeResult = null;

  public posterRequiredError = true;

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
    private yearService: YearService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
    private documentaryService: DocumentaryService,
    private userService: UserService,
    private omdbService: OMDBService,
    private youtubeService: YoutubeService,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.initModel();

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
          this.slug = params['params']['slug'];
          this.editMode = this.slug != null;

          if (this.editMode) {
            this.documentaryBySlugSubscription = this.documentaryService.getDocumentaryBySlug(this.slug)
              .subscribe((result: any) => {
                this.documentary = result;
                this.toggleForm();
                this.showPage = true;
              });
          } else {
            this.meSubscription = this.userService.getMe().subscribe(me => {
              this.me = me;
              console.log("me");
              console.log(me);
              console.log("this.hasToggledForm");
              console.log(this.hasToggledForm);

              if (!this.hasToggledForm) {
                this.fetchDocumentaries();
                this.showPage = true;
              }
            });
          }
        });
      });
  }

  initModel() {
    this.documentary = new Documentary();
    let standalone = new Standalone();
    this.documentary.standalone = standalone;
  }

  toggleForm() {
    this.showAddTitleButton = false;
    this.showDocumentaries = false;

    this.showForm = !this.showForm;

    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initForm();

    this.hasToggledForm = true;
  }

  initForm() {
    let title = this.documentary.title;
    let category = this.documentary.category;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let videoSource = this.documentary.standalone.videoSource;
    let videoId = this.documentary.standalone.videoId;
    let year = this.documentary.year;
    let length = this.documentary.length;
    let poster = this.documentary.poster;
    this.posterImgURL = this.documentary.poster;
    let wideImage = this.documentary.wideImage;
    this.wideImgURL = this.documentary.wideImage;
    let imdbId = this.documentary.imdbId;

    console.log("poster");
    console.log(poster);

    this.form = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'standalone': new FormGroup({
        'videoSource': new FormControl(videoSource, [Validators.required]),
        'videoId': new FormControl(videoId, [Validators.required]),
      }),
      'year': new FormControl(year, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required]),
      'imdbId': new FormControl(imdbId)
    });
  }

  get f() { return this.form.controls; }

  onPosterChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
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
        this.form.patchValue({
          wideImage: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

        this.wideImgURL = reader.result;
      };
    }
  }

  initYears() {
    this.isFetchingYears = true;

    this.years = this.yearService.getAllYearsForForm();

    this.isFetchingYears = false;
  }

  initVideoSources() {
    this.isFetchingVideoSources = true;

    let params: HttpParams;
    this.videoSourcesSubscription = this.videoSourceService.getAll(params)
      .subscribe(result => {
        this.videoSources = result;

        this.isFetchingVideoSources = false;
      });
  }

  initCategories() {
    this.isFetchingCategories = true;

    let params: HttpParams;
    this.categoriesSubscription = this.categoryService.getAll(params)
      .subscribe(result => {
        this.categories = result;

        this.isFetchingCategories = false;
      });
  }

  onSubmit() {
    this.submitted = true;
    this.errors = null;

    if (!this.form.valid) {
      return;
    }

    let formValue = this.form.value;
    console.log("formValue");
    console.log(formValue);

    if (this.editMode) {
      this.documentaryService.editStandaloneDocumentary(this.documentary.id, formValue)
        .subscribe((result: any) => {
          this.reset();
          this.router.navigate(["/add"]);
        },
          (error) => {
            console.log(error);
            this.errors = error.error;
          });
    } else {
      this.documentaryService.createStandaloneDocumentary(formValue)
        .subscribe((result: any) => {
          this.reset();
          this.router.navigate(["/add"]);
        },
          (error) => {
            console.log(error);
            this.errors = error.error;
            console.log("this.errors");
            console.log(this.errors);
          });
    }
  }

  fetchDocumentaries() {
    if (this.editMode) {
      this.showDocumentaries = false;
      return;
    }

    this.isFetchingDocumentaries = true;

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
        this.myDocumentaries = result['items'];

        this.isFetchingDocumentaries = false;
        this.showDocumentaries = true;
        this.showAddTitleButton = true;
      })
  }

  pageChanged(event) {
    console.log(event);
    this.config.currentPage = event;
    this.page = event;
    this.fetchDocumentaries();
  }

  reset() {
    this.initModel();
    this.submitted = false;
    this.hasToggledForm = false;
    this.showForm = false;
    this.showPage = false;
    this.showAddTitleButton = false;
    this.showDocumentaries = false;
  }

  initIMDBFrom() {
    let title = this.form.value.title;

    this.imdbForm = new FormGroup({
      'title': new FormControl(title, [Validators.required])
    });
  }

  imdbView(imdbId) {
    console.log("imdbId");
    console.log(imdbId);
    this.isFetchingDocumentaryFromIMDB = true;
    this.showSearchedDocumentariesFromIMDB = false;
    this.showSearchedDocumentaryFromIMDB = true;

    let imdbType = 'movie';
    this.omdbService.getByImdbId(imdbId, imdbType)
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
    console.log("this.form.value.title");
    console.log(this.form.value.title);
    if (this.form.value.title == null) {
      this.documentary.title = selectedDocumentary.title;
    } else {
      this.documentary.title = this.form.value.title;
    }

    if (this.form.value.imdbId != selectedDocumentary.imdbId) {
      this.documentary.imdbId = selectedDocumentary.imdbId;
    }

    if (this.form.value.storyline == null) {
      this.documentary.storyline = selectedDocumentary.storyline;
    } else {
      this.documentary.storyline = this.form.value.storyline;
    }

    if (this.form.value.year == null) {
      this.documentary.year = selectedDocumentary.year;
    } else {
      this.documentary.year = this.form.value.year;
    }

    console.log("this.form.value.poster");
    console.log(this.form.value.poster);
    if (this.form.value.poster == null) {
      console.log("selectedDocumentary.poster");
      console.log(selectedDocumentary.poster);
      this.documentary.poster = selectedDocumentary.poster;
      this.posterImgURL = selectedDocumentary.poster;
    } else {
      this.documentary.poster = this.form.value.poster;
      this.posterImgURL = this.form.value.poster;
    }

    console.log("this.documentary.poster");
    console.log(this.documentary.poster);

    if (this.form.value.length == null) {
      this.documentary.length = selectedDocumentary.duration;
    } else {
      this.documentary.length = this.form.value.length;
    }

    this.initForm();
    
    this.modalService.dismissAll();
  }

  searchOMDB() {
    this.isFetchingDocumentariesFromIMDB = true;
    this.showSearchedDocumentaryFromIMDB = false;
    this.showSearchedDocumentariesFromIMDB = true;

    let titleOrId = this.imdbForm.value.title;
    let imdbType = 'movie';

    this.getByImdbIdSubscription = this.omdbService.getByImdbId(titleOrId, imdbType)
      .subscribe((result: any) => {
        result = [result];
        this.searchedDocumentariesFromIMDB = result;
        this.isFetchingDocumentariesFromIMDB = false;
      },
        (error) => {
          this.ombdSearchSubscription = this.omdbService.getSearchedDocumentaries(titleOrId, imdbType)
            .subscribe((result: any) => {
              this.searchedDocumentariesFromIMDB = result;
              this.isFetchingDocumentariesFromIMDB = false;
            });
        });
  }

  openIMDBModal(content) {
    this.initIMDBFrom();
    console.log("content");
    console.log(content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-omdb' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  openYoutubeModal(content) {
    this.initYoutubeForm();

    this.modalService.open(content, { ariaLabelledBy: 'modal-youtube' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  initYoutubeForm() {
    let titleOrId = this.form.value.title;

    this.youtubeForm = new FormGroup({
      'title': new FormControl(titleOrId, [Validators.required])
    });
  }

  searchYoutube() {
    this.isFetchingVideosFromYoutube = true;
    this.showSearchedVideosFromYoutube = true;

    let titleOrId = this.youtubeForm.value.title;

    this.youtubeByIdSubscription = this.youtubeService.getById(titleOrId)
      .subscribe((result: any) => {
        this.searchedVideosFromYoutube = result['items'];
        this.isFetchingVideosFromYoutube = false;
      }, (error) => {
        this.youtubeSearchSubscription = this.youtubeService.getSearchedDocumentaries(titleOrId)
          .subscribe((result: any) => {
            this.searchedVideosFromYoutube = result['items'];
            this.isFetchingVideosFromYoutube = false;
          });
      });
  }

  youtubeSelect(selectedVideo) {

    console.log("this.form.value");
    console.log(this.form.value);

    console.log("this.documentary");
    console.log(this.documentary);

    if (this.form.value.title == null) {
      this.documentary.title = selectedVideo.snippet.title;
    } else {
      this.documentary.title = this.form.value.title;
    }

    if (this.form.value.storyline == null) {
      this.documentary.storyline = selectedVideo.snippet.description;
    } else {
      this.documentary.storyline = this.form.value.storyline;
    }

    if (this.form.value.wideImage == null) {
      this.documentary.wideImage = selectedVideo.snippet.thumbnails.default.url;
      this.wideImgURL = selectedVideo.snippet.thumbnails.default.url;
    } else {
      this.documentary.wideImage = this.form.value.wideImage;
    }

    if (this.form.value.summary == null) {
      this.documentary.summary = selectedVideo.snippet.description;
    } else {
      this.documentary.summary = this.form.value.summary;
    }

    if (this.form.value.standalone.videoId == null) {
      this.documentary.standalone.videoId = selectedVideo.id.videoId;
    } else {
      this.documentary.standalone.videoId = this.form.value.standalone.videoId;
    }

    this.documentary.poster = this.form.value.poster;
    this.posterImgURL = this.form.value.poster;
    this.documentary.category = this.form.value.category;
    this.documentary.year = this.form.value.year;
    this.documentary.length = this.form.value.length;
    this.documentary.standalone.videoSource = 2;

    this.initForm();

    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription != null) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.routeParamsSubscription != null) {
      this.routeParamsSubscription.unsubscribe();
    }
    if (this.documentaryBySlugSubscription != null) {
      this.documentaryBySlugSubscription.unsubscribe();
    }
    if (this.meSubscription != null) {
      this.meSubscription.unsubscribe();
    }
    if (this.getByImdbIdSubscription != null) {
      this.getByImdbIdSubscription.unsubscribe();
    }
    if (this.videoSourcesSubscription != null) {
      this.videoSourcesSubscription.unsubscribe();
    }
    if (this.categoriesSubscription != null) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.ombdSearchSubscription != null) {
      this.ombdSearchSubscription.unsubscribe();
    }
    if (this.youtubeSearchSubscription != null) {
      this.youtubeSearchSubscription.unsubscribe();
    }
    if (this.youtubeByIdSubscription != null) {
      this.youtubeByIdSubscription.unsubscribe();
    }
  }
}
