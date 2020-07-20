import { FeaturedService } from './../../../services/featured.service';
import { Series } from './../../../models/series.model';
import { Episodic } from './../../../models/episodic.model';
import { StatusService } from '../../../services/status.service';
import { YearService } from '../../../services/year.service';
import { YoutubeService } from '../../../services/youtube.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { VideoSourceService } from '../../../services/video-source.service';
import { Documentary } from '../../../models/documentary.model';
import { DocumentaryService } from '../../../services/documentary.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OMDBService } from 'src/app/services/omdb.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-series-edit',
  templateUrl: './admin-series-edit.component.html',
  styleUrls: ['./admin-series-edit.component.css']
})
export class AdminSeriesEditComponent implements OnInit {
  private episodicForm: FormGroup;
  private imdbForm: FormGroup;
  private youtubeForm: FormGroup;
  private documentary: Documentary;
  private posterImgURL: any;
  private wideImgURL: any;
  private years: any;
  private videoSources: any;
  private categories: any;
  private submitted = false;
  private closeResult: string;
  private statuses: any;
  private featuredOptions: any;

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

  public seasonNumber = 1;
  public episodeNumber = 1;

  public youtubeSeasonNumber;
  public youtubeEpisodeNumebr;

  public thumbnailImgURLDict = {};

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
    private modalService: NgbModal,
    private fb: FormBuilder) { }

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
    let category = new Category();
    let series = new Series();
    this.documentary.series = series;

    this.initStatuses();
    this.initYears();
    this.initVideoSources();
    this.initCategories();
    this.initFeatured();

    this.initForm();

    console.log("Here2");
    this.routeParamsSubscription = this.route.paramMap.subscribe(params => {
      let slug = params['params']['slug'];
      console.log("slug");
      console.log(slug);
      this.editMode = slug != null;
      console.log("this.editMode");
      console.log(this.editMode);

      if (this.editMode) {
        this.documentaryBySlugSubscription = this.documentaryService.getDocumentaryBySlug(slug)
          .subscribe((result: any) => {
            this.documentary = result;
            console.log("this.documentary");
            console.log(this.documentary);
            this.initForm(this.documentary.series.seasons);
          });
      }

    });
  }

  initFeatured() {
    this.featuredOptions = this.documentaryService.getFeaturedOptions();
  }

  initStatuses() {
    this.statuses = this.documentaryService.getStatuses();
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

  initForm(seasons = null) {
    let title = this.documentary.title;
    let category = this.documentary.category;
    console.log("category");
    console.log(category);
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let yearFrom = this.documentary.yearFrom;
    let yearTo = this.documentary.yearTo;
    let poster = this.documentary.poster;
    this.posterImgURL = this.documentary.poster;
    let wideImage = this.documentary.wideImage;
    this.wideImgURL = this.documentary.wideImage;
    let imdbId = this.documentary.imdbId;
    let featured = this.documentary.featured;

    this.episodicForm = this.fb.group({
      'title': new FormControl(title, [Validators.required]),
      'category': new FormControl(category, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'yearFrom': new FormControl(yearFrom, [Validators.required]),
      'yearTo': new FormControl(yearTo),
      'poster': new FormControl(poster, [Validators.required]),
      'wideImage': new FormControl(wideImage),
      'imdbId': new FormControl(imdbId),
      'featured': new FormControl(featured, [Validators.required]),
      'seasons': this.fb.array([], Validators.required)
    });

    if (seasons != null) {
      seasons.forEach(season => {
        this.addNewSeason(season);
      });
    }
  }

  addNewSeason(season = null) {
    if (season != null) {
      this.seasonNumber = season.number;
    }

    let control = <FormArray>this.episodicForm.controls.seasons;
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
    var seasonsFormArray = this.episodicForm.get("seasons") as FormArray;

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
    console.log("control");
    console.log(control);
    console.log("season");
    console.log(season);
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
      videoSource = 2;
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

  getEpisodeNumber(episode) {
    return episode.value.number;
  }

  getSeasonNumber(season) {
    return season.value.number;
  }

  onPosterChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.episodicForm.patchValue({
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

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.episodicForm.patchValue({
          wideImage: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

        this.wideImgURL = reader.result;
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
        episodesFormArray.at(episodeNumber)['controls']['thumbnail'].patchValue(reader.result);

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

  openIMDBModal(content) {
    this.initIMDBFrom();

    this.modalService.open(content, { ariaLabelledBy: 'modal-omdb' }).result.then((result) => {
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

    this.modalService.open(content, { ariaLabelledBy: 'modal-youtube' }).result.then((result) => {
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

    //this.documentary.series.videoId = selectedVideo.id.videoId;

    this.initForm();

    this.modalService.dismissAll();
  }

  onEpisodicSubmit() {
    this.submitted = true;

    let documentaryId = this.documentary.id;
    let formValue = this.episodicForm.value;
    let episodic = {};
    episodic['seasons'] = formValue.seasons;
    formValue.episodic = episodic;
    formValue.seasons = null;

    console.log("formValue");
    console.log(formValue);


    if (this.episodicForm.valid) {
      if (this.editMode) {
        this.documentaryService.editEpisodicDocumentary(documentaryId, formValue)
          .subscribe((result: any) => {
            console.log(result);
            this.router.navigate(["/admin/documentaries", result.slug]);
          }, error => {
            console.log(error);
          });
      } else {
        this.documentaryService.createEpisodicDocumentary(formValue)
          .subscribe((result: any) => {
            console.log("created result");
            console.log(result);
            this.router.navigate(["/admin/documentaries", result.slug]);
          }, error => {
            console.log(error);
          })
      }
    }
  }

  get fEpisodic() { return this.episodicForm.controls; }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    if (this.documentaryBySlugSubscription != null) {
      this.documentaryBySlugSubscription.unsubscribe();
    }
  }
}
