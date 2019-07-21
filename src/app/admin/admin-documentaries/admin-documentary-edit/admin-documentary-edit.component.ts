import { Documentary } from './../../../models/documentary.model';
import { DocumentaryService } from './../../../services/documentary.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-documentary-edit',
  templateUrl: './admin-documentary-edit.component.html',
  styleUrls: ['./admin-documentary-edit.component.css']
})
export class AdminDocumentaryEditComponent implements OnInit {
  documentary: Documentary;
  editDocumentaryForm: FormGroup;
  imgURL: any;

  constructor(
    private route: ActivatedRoute,
    private documentaryService: DocumentaryService,
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
    this.route.data.subscribe(result => {
      this.documentary = <Documentary> result[0];
      this.initForm();
    })
  }
  
  initForm() {
    let title = this.documentary.title;
    let slug = this.documentary.slug;
    let storyline = this.documentary.storyline;
    let summary = this.documentary.summary;
    let year = this.documentary.year;
    let length = this.documentary.length;
    let status = this.documentary.status;
    let posterfile = this.documentary.posterFile;
    this.imgURL = posterfile;

    this.editDocumentaryForm = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'slug': new FormControl(slug, [Validators.required]),
      'storyline': new FormControl(storyline, [Validators.required]),
      'summary': new FormControl(summary, [Validators.required]),
      'year': new FormControl(year, [Validators.required]),
      'length': new FormControl(length, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
      'posterFile': new FormControl(posterfile, [Validators.required])
    });

    this.editDocumentaryForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onFileChange(event) {
    let reader = new FileReader();
 
  if(event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
  
    reader.onload = () => {
      this.editDocumentaryForm.patchValue({
        posterFile: reader.result
      });
      
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();

      this.imgURL = reader.result; 
    };
  }
  }

  onSubmit() {
    this.documentaryService.patch(this.editDocumentaryForm.value);
    console.log(this.editDocumentaryForm.value);
  }
}
