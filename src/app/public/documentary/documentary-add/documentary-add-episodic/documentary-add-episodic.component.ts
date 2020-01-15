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
  private submitted = false;
  private errors = null;

  private posterImgURL;s
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
  
  private seasonNumber = 1;
  private episodeNumber = 1;

  constructor(
    private documentaryService: DocumentaryService,
    private userService: UserService,
    private yearService: YearService,
    private videoSourceService: VideoSourceService,
    private categoryService: CategoryService,
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
      'year': new FormControl(year, [Validators.required]),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage, [Validators.required]),
      'imdbId': new FormControl(imdbId),
      'seasons': this.fb.array([], Validators.required)
    });

    if (seasons != null) {
      seasons.forEach(season => {
        this.addNewSeason(season);
      });
    }
  }

  getEpisodeNumber(episode) {
    return episode.value.number;
  }

  getSeasonNumber(season) {
    return season.value.number;
  }

  addNewSeason(season = null) {
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
          this.addNewEpisode(episodesControl, season, episode);
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

  addNewEpisode(control, season, episode = null) {
    if (episode == null) {
      let currentNumber = season.episodes.length;
      currentNumber++;
      this.episodeNumber = currentNumber;
    }

    let title;
    let storyline;
    let summary;
    let year;
    let length;
    let imdbId;
    let videoId;
    let videoSource;
    let thumbnail;

    if (episode != null) {
      this.episodeNumber = episode.number;
      title = episode.title;
      imdbId = episode.imdbId;
      thumbnail = episode.thumbnail;
      summary = episode.summary;
      storyline = episode.storyline;
      year = episode.year;
      videoId = episode.videoId;
      videoSource = episode.videoSource;
      length = episode.length;

      if (this.thumbnailImgURLDict[season.number - 1] == undefined) {
        this.thumbnailImgURLDict[season.number - 1] = {};
      }
      this.thumbnailImgURLDict[season.number - 1][this.episodeNumber - 1] = thumbnail;
    }

    control.push(
      this.fb.group({
        'number': new FormControl(this.episodeNumber, [Validators.required]),
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

  getThumbnailForSeasonAndEpsiode(seasonNumber, episodeNumber) {
    if (this.thumbnailImgURLDict[seasonNumber] == undefined) {
      this.thumbnailImgURLDict[seasonNumber] = {};
    }

    return this.thumbnailImgURLDict[seasonNumber][episodeNumber];
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
}
