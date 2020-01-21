import { YoutubeService } from './../../../../services/youtube.service';
import { OMDBService } from './../../../../services/omdb.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from './../../../../services/category.service';
import { VideoSourceService } from './../../../../services/video-source.service';
import { HttpParams } from '@angular/common/http';
import { YearService } from './../../../../services/year.service';
import { UserService } from './../../../../services/user.service';
import { DocumentaryService } from './../../../../services/documentary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Episodic } from './../../../../models/episodic.model';
import { Documentary } from 'src/app/models/documentary.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-documentary-add-episodic',
  templateUrl: './documentary-add-episodic.component.html',
  styleUrls: ['./documentary-add-episodic.component.css']
})
export class DocumentaryAddEpisodicComponent implements OnInit {

  private documentary: Documentary;

  private form: FormGroup;
  private imdbForm: FormGroup;
  private youtubeForm: FormGroup;

  private submitted = false;
  private errors = null;

  private posterImgURL; s
  private wideImgURL;
  private thumbnailImgURLDict = {};

  private page;
  private slug;
  private editMode = false;

  private me;

  private config: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
  };

  private showPage = false;
  private hasToggledForm = false;
  private showForm = false;
  private showAddTitleButton = true;
  private showDocumentaries = true;

  private isFetchingYears = false;
  private isFetchingVideoSources = false;
  private isFetchingCategories = false;
  private isFetchingDocumentaries = false;

  private isFetchingDocumentariesFromIMDB = false;
  private isFetchingDocumentaryFromIMDB = false;
  private showSearchedDocumentariesFromIMDB = false;
  private showSearchedDocumentaryFromIMDB = false;

  private searchedDocumentariesFromIMDB;
  private searchedDocumentaryFromIMDB;

  private isFetchingVideosFromYoutube = false;
  private showSearchedVideosFromYoutube = false;
  private searchedVideosFromYoutube;

  private years;
  private videoSources;
  private categories;

  private myDocumentaries;

  private queryParamsSubscription;
  private routeParamsSubscription;
  private documentaryBySlugSubscription;
  private meSubscription;
  private videoSourcesSubscription;
  private categoriesSubscription;
  private getByImdbIdSubscription;
  private ombdSearchSubscription;
  private youtubeByIdSubscription;
  private youtubeSearchSubscription;

  private closeResult: string;

  private seasonNumber = 1;
  private episodeNumber = 1;

  private imdbType;

  constructor(
    private documentaryService: DocumentaryService,
    private userService: UserService,
    private yearService: YearService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
    private omdbService: OMDBService,
    private youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private router: Router,
    private location: Location,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initModel();

    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;

        this.routeParamsSubscription = this.route
          .paramMap
          .subscribe(params => {
            this.slug = params['params']['slug'];
            this.editMode = this.slug != null;

            if (this.editMode) {
              this.documentaryBySlugSubscription = this.documentaryService
                .getDocumentaryBySlug(this.slug)
                .subscribe((result: any) => {
                  this.documentary = result;
                  this.toggleForm();
                  this.showPage = true;
                });
            } else {
              this.meSubscription = this.userService
                .getMe()
                .subscribe(me => {
                  this.me = me;

                  if (!this.hasToggledForm) {
                    this.fetchDocumentaries();
                    this.showPage = true;
                  }
                })
            }
          })
      })
  }

  initModel() {
    this.documentary = new Documentary();
    let episodic = new Episodic();
    this.documentary.episodic = episodic;
  }

  toggleForm() {
    this.showAddTitleButton = false;
    this.showDocumentaries = false;

    this.showForm = !this.showForm;

    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initForm();
  }

  initForm(seasons = null) {
    let title = this.documentary.title;
    let category = this.documentary.category;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    // let videoSource = null;
    //if (this.documentary.standalone.videoSource) {
    //  videoSource = this.documentary.standalone.videoSource.id
    // }
    //let videoId = this.documentary.standalone.videoId;
    let year = this.documentary.year;
    let yearFrom = this.documentary.yearFrom;
    let yearTo = this.documentary.yearTo;
    //let length = this.documentary.length;
    let poster = this.documentary.poster;
    this.posterImgURL = this.documentary.poster;
    let wideImage = this.documentary.wideImage;
    this.wideImgURL = this.documentary.wideImage;
    let imdbId = this.documentary.imdbId;

    this.form = this.fb.group({
      'title': new FormControl(title, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'yearFrom': new FormControl(yearFrom, [Validators.required]),
      'yearTo': new FormControl(yearTo, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required]),
      'imdbId': new FormControl(imdbId),
      'seasons': this.fb.array([], Validators.required)
    });

    if (seasons != null) {
      seasons.forEach(season => {
        this.addSeason(season);
      });
    }

    console.log("this.thumbnailImgURLDict");
    console.log(this.thumbnailImgURLDict);
  }

  getEpisodeNumber(episode) {
    return episode.value.number;
  }

  getSeasonNumber(season) {
    return season.value.number;
  }

  addSeason(season = null) {
    if (season != null) {
      this.seasonNumber = season.number;
    }

    let control = <FormArray>this.form.controls.seasons;
    control.push(
      this.fb.group({
        'number': new FormControl(this.seasonNumber, [Validators.required]),
        'episodes': this.fb.array([], Validators.required)
      })
    );

    if (season != null) {
      let episodes = season.episodes;
      if (season != null && episodes != null) {
        episodes.forEach(episode => {
          let episodesControl = control.at(this.seasonNumber - 1).get('episodes');
          this.addEpisode(episodesControl, season, episode);
        })
      }
    }

    if (season == null) {
      this.seasonNumber++;
    }
  }

  deleteSeason(number) {
    var seasonsFormArray = this.form.get("seasons") as FormArray;

    let index = 0;
    seasonsFormArray.value.forEach(seasonArray => {
      if (number == seasonArray.number) {
        seasonsFormArray.removeAt(index);
        return;
      }
      index++;
    });
  }

  deleteEpisode(control, index) {
    control.removeAt(index);
  }

  insertEpisode(control,index) {
    let title;
    let storyline;
    let summary;
    let year;
    let length;
    let imdbId;
    let videoId;
    let videoSource = 2;
    let thumbnail;
    let episodeNumber;
    
    control.insert(index,
      this.fb.group({
        'number': new FormControl(episodeNumber, [Validators.required]),
        'title': new FormControl(title, [Validators.required]),
        'imdbId': new FormControl(imdbId),
        'storyline': new FormControl(storyline, [Validators.required]),
        'summary': new FormControl(summary, [Validators.required]),
        'length': new FormControl(length, [Validators.required]),
        'year': new FormControl(year, [Validators.required]),
        'videoSource': new FormControl(videoSource, [Validators.required]),
        'videoId': new FormControl(videoId, [Validators.required]),
        'thumbnail': new FormControl(thumbnail, [Validators.required]),
      }));
  }

  addEpisode(control, season, episode = null) {
    let title;
    let storyline;
    let summary;
    let year;
    let length;
    let imdbId;
    let videoId;
    let videoSource = 2;
    let thumbnail;
    let episodeNumber;

    if (episode != null) {
      episodeNumber = episode.number;
      title = episode.title;
      imdbId = episode.imdbId;
      thumbnail = episode.thumbnail;
      summary = episode.summary;
      storyline = episode.storyline;
      year = episode.year;
      videoId = episode.videoId;
      videoSource = 2;
      length = episode.length;
      
      if (this.thumbnailImgURLDict[season.number] == undefined) {
        this.thumbnailImgURLDict[season.number] = {};
      }
      if (this.thumbnailImgURLDict[season.number][episode.number] == undefined) {
        this.thumbnailImgURLDict[season.number][episode.number] = {};
      }
      this.thumbnailImgURLDict[season.number][episode.number] = thumbnail;
    }

    control.push(
      this.fb.group({
        'number': new FormControl(episodeNumber, [Validators.required]),
        'title': new FormControl(title, [Validators.required]),
        'imdbId': new FormControl(imdbId),
        'storyline': new FormControl(storyline, [Validators.required]),
        'summary': new FormControl(summary, [Validators.required]),
        'length': new FormControl(length, [Validators.required]),
        'year': new FormControl(year, [Validators.required]),
        'videoSource': new FormControl(videoSource, [Validators.required]),
        'videoId': new FormControl(videoId, [Validators.required]),
        'thumbnail': new FormControl(thumbnail, [Validators.required]),
      }));
      
  }

  get f() { return this.form.controls; }

  getThumbnailForSeasonAndEpsiode(seasonNumber: number, episodeNumber: number) {
    if (this.thumbnailImgURLDict[seasonNumber] == undefined) {
      this.thumbnailImgURLDict[seasonNumber] = {};
    }
    return this.thumbnailImgURLDict[seasonNumber][episodeNumber];
  }

  onThumbnailChange(event, seasonIndex, episodeIndex) {
    console.log(event);
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        var seasonsFormArray = this.form.get("seasons") as FormArray;
        var episodesFormArray = seasonsFormArray.at(seasonIndex).get("episodes") as FormArray;
        episodesFormArray.at(episodeIndex)['controls']['thumbnail'].patchValue(reader.result);

        let seasonNumber = seasonsFormArray.at(seasonIndex).value.number;
        let episodeNumber = episodesFormArray.at(episodeIndex).value.number;

        if (this.thumbnailImgURLDict[seasonNumber] == undefined) {
          this.thumbnailImgURLDict[seasonNumber] = {};
        }
        this.thumbnailImgURLDict[seasonNumber][episodeNumber] = reader.result;
      }

      this.cd.markForCheck();

    };
  }

  openIMDBModal(content, imdbType) {
    console.log(imdbType);
    this.imdbType = imdbType;
    this.initIMDBFrom();
    console.log(content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-omdb' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
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

    let imdbType = this.imdbType;
    this.omdbService.getByImdbId(imdbId, imdbType)
      .subscribe((result: any) => {
        this.searchedDocumentaryFromIMDB = result;
        this.isFetchingDocumentaryFromIMDB = false;
        console.log("searchedDocumentaryFromIMDB");
        console.log(this.searchedDocumentaryFromIMDB);
      })
  }

  imdbSelect() {
    let selectedDocumentary = this.searchedDocumentaryFromIMDB;
    console.log("selectedDocumentary");
    console.log(selectedDocumentary);
    console.log("this.form");
    console.log(this.form);
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

    if (this.form.value.yearFrom == null) {
      this.documentary.yearFrom = selectedDocumentary.yearFrom;
    } else {
      this.documentary.yearFrom = this.form.value.yearFrom;
    }

    if (this.form.value.yearTo == null) {
      this.documentary.yearTo = selectedDocumentary.yearTo;
    } else {
      this.documentary.yearTo = this.form.value.yearTo;
    }

    if (this.form.value.poster == null) {
      this.documentary.poster = selectedDocumentary.poster;
      this.posterImgURL = selectedDocumentary.poster;
    } else {
      this.documentary.poster = this.form.value.poster;
      this.posterImgURL = this.form.value.poster;
    }

    let seasons = selectedDocumentary.seasons;
    this.initForm(seasons);

    this.modalService.dismissAll();
  }

  searchOMDB() {
    this.isFetchingDocumentariesFromIMDB = true;
    this.showSearchedDocumentaryFromIMDB = false;
    this.showSearchedDocumentariesFromIMDB = true;

    let titleOrId = this.imdbForm.value.title;
    let imdbType = this.imdbType;

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

  fetchDocumentaries() {
    if (this.editMode) {
      this.showDocumentaries = false;
      return;
    }

    this.isFetchingDocumentaries = true;

    let params = new HttpParams();

    params = params.append('page', this.page.toString());

    this.location.go(this.router.url.split("?")[0], params.toString());

    this.documentaryService.getMyEpisodicDocumentaries(params, this.me.username)
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
    this.config.currentPage = event;
    this.page = event;
    this.fetchDocumentaries();
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
        console.log("this.videoSources");
        console.log(this.videoSources);

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
    this.errors = null;

    console.log(this.f);
    console.log(this.form.value);

    this.submitted = true;

    let formValue = this.form.value;

    if (formValue.seasons.length === 0) {
      this.errors = "You must add a season";
    }

    if (formValue.seasons[0].episodes.length === 0) {
      this.errors = "You must add an episode";
    }

    if (!this.form.valid) {
      return;
    }

    this.errors = null;

    if (this.editMode) {
      this.documentaryService.editEpisodicDocumentary(this.documentary.id, formValue)
        .subscribe((result: any) => {
          //this.reset();
          this.router.navigate(["/add/episodic"]);
        },
          (error) => {
            console.log(error);
            this.errors = error.error;
          });
    } else {
      this.documentaryService.createEpisodicDocumentary(formValue)
        .subscribe((result: any) => {
          //this.reset();
          this.router.navigate(["/add/episodic"]);
        },
          (error) => {
            console.log(error);
            this.errors = error.error;
          });
    }
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
    if (this.ombdSearchSubscription != null) {
      this.ombdSearchSubscription.unsubscribe();
    }
    this.meSubscription.unsubscribe();
  }
}
