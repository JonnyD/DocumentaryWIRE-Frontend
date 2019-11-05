import { YoutubeService } from './../../../services/youtube.service';
import { UserService } from './../../../services/user.service';
import { DocumentaryService } from './../../../services/documentary.service';
import { YearService } from './../../../services/year.service';
import { CategoryService } from './../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { Documentary } from './../../../models/documentary.model';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
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

  public type;

  public activeIdString;

  public documentary: Documentary;
  public categories;
  public years;
  public videoSources;
  public posterImgURL;
  public wideImgURL;
  public imdb: IMDB;
  public thumbnailImgURLDict = {};

  private queryParamsSubscription;
  private routeParamsSubscription;
  private documentaryBySlugSubscription;
  private meSubscription;
  private getByImdbIdSubscription;

  public myStandaloneDocumentaries;
  public showStandaloneDocumentaries = false;

  public showStandaloneForm:boolean = false;
  public standaloneFormLoaded = false;
  public showStandaloneAddTitleButton = true;

  public showEpisodicForm = false;
  public showEpisodicPage = false;
  public showEpisodicDocumentaries = false;
  public showEpisodicAddTitleButton = true;
  public myEpisodicDocumentaries;
  
  public isFetchingEpisodicDocumentaries = false;

  public showStandalonePage = false;
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
  
  public hasToggledStandaloneForm = false;

  public hasToggledEpisodicForm = false;

  public submitted = false;

  public posterError = false;

  public errors;

  public seasonNumber = 1;
  public episodeNumber = 1;

  standaloneForm: FormGroup;
  episodicForm: FormGroup;
  imdbForm: FormGroup;
  youtubeForm: FormGroup;

  standaloneConfig: any;
  episodicConfig: any;
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
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.start('standalone');
  }

  start(type: string = null) {
    if (type != null) {
      this.type = type;
    }

    this.reset();

    this.documentary = new Documentary();

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
          if (type == null) {
            this.type = params['params']['type'];
          }
          this.slug = params['params']['slug'];
          this.editMode = this.slug != null;

          this.activeIdString = this.type;

          if (this.editMode) {
            this.documentaryBySlugSubscription = this.documentaryService.getDocumentaryBySlug(this.slug)
              .subscribe((result:any) => {
                this.documentary = result;
                console.log(result);

                if (this.documentary.type === 'standalone') {
                  console.log(this.documentary.type);
                  this.toggleStandaloneForm();
                  this.showStandalonePage = true;
                } else if (this.documentary.type === 'episodic') {
                  this.toggleEpisodicForm();
                  this.showEpisodicPage = true;
                }
              });
          } else {
            this.meSubscription = this.userService.getMe().subscribe(me => {
              this.me = me;

              if (this.type === 'standalone') {
                console.log("fdjksjfk");
                if (!this.hasToggledStandaloneForm) {
                  this.fetchStandaloneDocumentaries();
                  this.showStandalonePage = true;
                  console.log("dfff");
                }
              } else if (this.type === 'episodic') {
                console.log('episodic');
                if (!this.hasToggledEpisodicForm) {
                  this.fetchEpisodicDocumentaries();
                  this.showEpisodicPage = true;
                }
              }
            });
          }
        });
      });
  }

  reset() {
    this.hasToggledEpisodicForm = false;
    this.hasToggledStandaloneForm = false;
    this.showStandaloneForm = false;
    this.showEpisodicForm = false;
    this.showEpisodicPage = false;
    this.showStandalonePage = false;
    this.showEpisodicAddTitleButton = false;
    this.showStandaloneAddTitleButton = false;
    this.showStandaloneDocumentaries = false;
    this.showEpisodicDocumentaries = false;
  }

  tabChange(event) {
    console.log(event);
    this.start(event.nextId);
  }

  fetchStandaloneDocumentaries() {
    if (this.editMode) {
      this.showStandaloneDocumentaries = false;
      return;
    }

    this.isFetchingStandaloneDocumentaries = true;

    let params = new HttpParams();

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    this.documentaryService.getMyStandloneDocumentaries(params, this.me.username)
      .subscribe(result => {
        this.standaloneConfig = {
          itemsPerPage: 5,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        console.log("result");
        console.log(result);
        this.myStandaloneDocumentaries = result['items'];

        this.isFetchingStandaloneDocumentaries = false;
        this.showStandaloneDocumentaries = true;
        this.showStandaloneAddTitleButton = true;
      })
  }

  fetchEpisodicDocumentaries() {

    this.isFetchingEpisodicDocumentaries = true;

    let params = new HttpParams();

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());
  
    this.documentaryService.getMyEpisodicDocumentaries(params, this.me.username)
      .subscribe(result => {
        this.episodicConfig = {
          itemsPerPage: 5,
          currentPage: this.page,
          totalItems: result['count_results']
        };
        this.myEpisodicDocumentaries = result['items'];

        this.isFetchingEpisodicDocumentaries = false;
        this.showEpisodicDocumentaries = true;
        this.showEpisodicAddTitleButton = true;
      })
  }

  toggleStandaloneForm() {
    console.log("toggle");
    this.showStandaloneAddTitleButton = false;

    this.showStandaloneDocumentaries = false;

    this.showStandaloneForm = !this.showStandaloneForm;

    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initStandaloneForm();

    this.hasToggledStandaloneForm = true;
  }

  toggleEpisodicForm() {
    console.log("toggle");
    this.showEpisodicAddTitleButton = false;

    this.showEpisodicDocumentaries = false;

    this.showEpisodicForm = !this.showEpisodicForm;

    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initEpisodicForm();

    this.hasToggledEpisodicForm = true;
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
      'imdbId': new FormControl(imdbId)
    });
  }

  initEpisodicForm(seasons = null) {
    let title = this.documentary.title;
    let category = null;
    if (this.documentary.category) {
      category = this.documentary.category.id;
    }
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let year = this.documentary.year;
    let poster = this.documentary.poster;
    this.posterImgURL = this.documentary.poster;
    let wideImage = this.documentary.wideImage;
    this.wideImgURL = this.documentary.wideImage;
    let imdbId = this.documentary.imdbId;

    this.episodicForm = this.fb.group({
      'title': new FormControl(title, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'year': new FormControl(year, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage),
      'imdbId': new FormControl(imdbId),
      'seasons': this.fb.array([], Validators.required)
    });

    if (seasons != null) {
      seasons.forEach(season => {
        this.addNewSeason(season);
      });
    }
  }

  addNewSeason(season = null) {
    let number = season.number
    if (number == null) {
      number = this.seasonNumber;
    }

    let control = <FormArray>this.episodicForm.controls.seasons;
    control.push(
      this.fb.group({
        'seasonNumber': new FormControl(number, [Validators.required]),
        'episodes': this.fb.array([], Validators.required)
      })
    );

    let episodes = season.episodes;
    if (season != null && episodes != null) {
      episodes.forEach(episode => {
        let episodesControl = control.at(number - 1).get('episodes');
        this.addNewEpisode(episodesControl, season, episode);
      })
    }

    if (season == null) {
      this.seasonNumber++;
    }
  }

  deleteSeason(index) {
    var seasonsFormArray = this.episodicForm.get("seasons") as FormArray;
    seasonsFormArray.removeAt(index);
  }

  addNewEpisode(control, season = null, episode = null) {
    let episodeNumber;
    let title;
    let storyline;
    let summary;
    let year;
    let length;
    let imdbId;
    let videoId;
    let videoSource;
    let poster;

    if (episode != null) {
      episodeNumber = episode.number;
      title = episode.title;
      imdbId = episode.imdbId;
      poster = episode.thumbnail;
      summary = episode.summary;
      storyline = episode.plot;
      year = episode.year;
      videoId = episode.videoId;
      videoSource = episode.videoSource;

      let seasonNumber = season.number;
      if (this.thumbnailImgURLDict[seasonNumber - 1] == undefined) {
        this.thumbnailImgURLDict[seasonNumber - 1] = {};
      }
      this.thumbnailImgURLDict[seasonNumber - 1][episodeNumber - 1] = poster;
    }

    control.push(
      this.fb.group({
        'episodeNumber': new FormControl(episodeNumber, [Validators.required]),
        'title': new FormControl(title, [Validators.required]),
        'imdbId': new FormControl(imdbId),
        'storyline': new FormControl(storyline, [Validators.required]),
        'summary': new FormControl(summary, [Validators.required]),
        'length': new FormControl(length, [Validators.required]),
        'year': new FormControl(year, [Validators.required]),
        'videoSource': new FormControl(videoSource, [Validators.required]),
        'videoId': new FormControl(videoId, [Validators.required]),
        'poster': new FormControl(poster, [Validators.required]),
      }));
  }
  
  deleteEpisode(seasonIndex, episodeIndex) {
    var seasonsFormArray = this.episodicForm.get("seasons") as FormArray;
    var episodesFormArray = seasonsFormArray.at(seasonIndex).get("episodes") as FormArray;
    episodesFormArray.removeAt(episodeIndex);
  }

  get fStandalone() { return this.standaloneForm.controls; }
  get fEpisodic() { return this.episodicForm.controls; }

  onPosterChange(event) {
    let reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        if (this.type == 'standalone') {
          this.standaloneForm.patchValue({
            poster: reader.result
          });
        } else {
          this.episodicForm.patchValue({
            poster: reader.result
          })
        }
        
        this.cd.markForCheck();

        this.posterImgURL = reader.result; 
      };
    }
  }

  onThumbnailChange(event, seasonNumber, episodeNumber) {
    console.log(event);
    let reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        var seasonsFormArray = this.episodicForm.get("seasons") as FormArray;
        var episodesFormArray = seasonsFormArray.at(seasonNumber).get("episodes") as FormArray;
        episodesFormArray.at(episodeNumber)['controls']['poster'].patchValue(reader.result);

        if (this.thumbnailImgURLDict[seasonNumber] == undefined) {
          this.thumbnailImgURLDict[seasonNumber] = {};
        }
        this.thumbnailImgURLDict[seasonNumber][episodeNumber] = reader.result;
      }
        
        this.cd.markForCheck();

      };
    }

  getThumbnailForSeasonAndEpsiode(seasonNumber, episodeNumber) {
    if (this.thumbnailImgURLDict[seasonNumber] == undefined) {
      this.thumbnailImgURLDict[seasonNumber] = {};
    }

    return this.thumbnailImgURLDict[seasonNumber][episodeNumber];
  }
  
  onWideImageChange(event) {
    let reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        if (this.type == 'standalone') {
          this.standaloneForm.patchValue({
            wideImage: reader.result
          });
        } else {
          this.episodicForm.patchValue({
            wideImage: reader.result
          });
        }
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

        this.wideImgURL = reader.result; 
      };
    }
  }

  initIMDBFrom() {
    let title = null;

    if (this.type === 'standalone') {
      title = this.standaloneForm.value.title;
    } else if (this.type === 'episodic') {
      title = this.episodicForm.value.title;
    }

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

    this.omdbService.getByImdbId(imdbId, 'movie')
      .subscribe((result: any) => {
        console.log(result);
        this.searchedDocumentaryFromIMDB = result;
        this.isFetchingDocumentaryFromIMDB = false;
      })
  }

  imdbSelect(selectedDocumentary) {
    this.documentary.title = selectedDocumentary.Title;

    if (this.documentary.imdbId != selectedDocumentary.imdbID) {
      this.documentary.imdbId = selectedDocumentary.imdbID;
      this.documentary.storyline = selectedDocumentary.Plot;
      this.documentary.year = selectedDocumentary.Year;
      this.documentary.poster = selectedDocumentary.Poster;
      this.posterImgURL = selectedDocumentary.Poster;
    }

    if (this.type === 'standaloine') {
      this.initStandaloneForm();
      this.modalService.dismissAll();  
    } else if (this.type === 'episodic') {
      this.getByImdbIdSubscription = this.omdbService.getByImdbId(selectedDocumentary.imdbID, this.type)
        .subscribe((result: any) => {
          console.log("result");
          console.log(result);
          let seasons = result['seasons'];
          this.initEpisodicForm(seasons);
          this.modalService.dismissAll();
      
      });
    }
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
    let imdbType = 'movie';
    if (this.type === 'episodic') {
      imdbType = 'series';
    }
    this.omdbService.getSearchedDocumentaries(title, imdbType)
      .subscribe((result: any) => {
        console.log(result);
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

  onStandaloneSubmit() {
    if (!this.standaloneForm.valid) {
      return;
    }

    this.submitted = true;
    this.errors = null;

    let values = this.standaloneForm.value;

    let formValue = this.standaloneForm.value;

    if (this.editMode) {
      this.documentaryService.editStandaloneDocumentary(this.documentary.id, formValue)
        .subscribe((result: any) => {
          this.reset();
          this.router.navigate(["/add/standalone"]);
        },
        (error) => {
          console.log(error);
          this.errors = error.error;
        });
    } else {
      this.documentaryService.createStandaloneDocumentary(formValue)
        .subscribe((result: any) => {
          this.reset();
          this.router.navigate(["/add/standalone"]);
      },
      (error) => {
        console.log(error);
        this.errors = error.error;
      });
    }
  }

  onEpisodicSubmit() {
    console.log(this.fEpisodic);
    console.log(this.episodicForm.value);

    if (!this.episodicForm.valid) {
      return;
    }

    this.submitted = true;
    this.errors = null;

    let values = this.episodicForm.value;

    let formValue = this.episodicForm.value;

    if (this.editMode) {
      this.documentaryService.editEpisodicDocumentary(this.documentary.id, formValue)
        .subscribe((result: any) => {
          this.reset();
          this.router.navigate(["/add/episodic"]);
        },
        (error) => {
          console.log(error);
          this.errors = error.error;
        });
    } else {
      this.documentaryService.createEpisodicDocumentary(formValue)
        .subscribe((result: any) => {
          this.reset();
          this.router.navigate(["/add/episodic"]);
      },
      (error) => {
        console.log(error);
        this.errors = error.error;
      });
    }
  }
  
  pageChanged(event) {
    console.log(event);
    this.standaloneConfig.currentPage = event;
    this.page = event;
    this.fetchStandaloneDocumentaries();
  }
  
  episodicPageChanged(event) {
    console.log(event);
    this.episodicConfig.currentPage = event;
    this.page = event;
    this.fetchEpisodicDocumentaries();
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
    if (this.documentaryBySlugSubscription != null) {
      this.documentaryBySlugSubscription.unsubscribe();
    }
    if (this.meSubscription != null) {
      this.meSubscription.unsubscribe();
    }
    if (this.getByImdbIdSubscription != null) {
      this.getByImdbIdSubscription.unsubscribe();
    }
  }
}
