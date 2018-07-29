import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "../../../node_modules/@angular/forms";

@Component({
  selector: "app-edit-movie",
  templateUrl: "./edit-movie.component.html",
  styleUrls: ["./edit-movie.component.css"]
})
export class EditMovieComponent implements OnInit {
  editFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {}
  private _originalCopy: any;
  private _updatedCopy: any;
  private get originalForm(): any {
    return this._originalCopy;
  }
  private set originalForm(fg: any) {
    this._originalCopy = fg;
  }

  private get updatedForm(): any {
    return this._updatedCopy;
  }
  private set updatedForm(fg: any) {
    this._updatedCopy = fg;
  }

  ngOnInit() {
    //Get the selected value that has been save to local storage
    var currentEdit = JSON.parse(localStorage.getItem("editedMovie"));
    //populate form with values from selected edited value
    this.editFormGroup = this.fb.group({
      id: ["", Validators.required],
      title: ["", Validators.required],
      trailer: ["", Validators.required],
      showings: ["", Validators.required],
      poster: ["", Validators.required],
      backdrop: ["", Validators.required],
      subbed: ["", Validators.required],
      dubbed: ["", Validators.required],
      theaterUrl: ["", Validators.required],
      ratingsGroup: this.fb.group({
        ratings: ["G", Validators.required]
      })
    });

    this.editFormGroup.patchValue({
      id: currentEdit["id"],
      title: currentEdit["title"],
      trailer: currentEdit["trailer"],
      showings: currentEdit["showings"],
      poster: currentEdit["poster_sm"],
      backdrop: currentEdit["backdrop_sm"],
      subbed: currentEdit["subbed"],
      dubbed: currentEdit["dubbed"],
      theaterUrl: currentEdit["theaterUrl"]
      //TODO add rating populate here
    });
    this.originalForm = this.editFormGroup.value;

  }
  checkDirty():boolean {
    this.updatedForm = this.editFormGroup.value;
    var originalValues = this.originalForm ;
    var updatedValues = this.updatedForm  ;
    var keys = Object.keys(originalValues);
    var proceed:boolean = true;
    keys.forEach((Key,index) => {
      console.log(originalValues[Key])
      console.log(updatedValues[Key])
        if(index!==9)//TODO URL comparison not evaulating properly on index 9 need to fix
        if(originalValues[Key]!== updatedValues[Key]){
          console.log("value fail"+index);
          proceed = false;
          return proceed;
        }

    });

    return proceed;
  }
  submit() {
    var data = {
      id: this.editFormGroup.get("id").value,
      title: this.editFormGroup.get("title").value,
      trailer: this.editFormGroup.get("trailer").value,
      showings: this.editFormGroup.get("showings").value,
      poster: this.editFormGroup.get("poster").value,
      backdrop: this.editFormGroup.get("backdrop").value,
      subbed: this.editFormGroup.get("subbed").value,
      dubbed: this.editFormGroup.get("dubbed").value,
      theaterUrl: this.editFormGroup.get("theaterUrl").value,
      rating: this.editFormGroup.get("ratingGroup.rating").value
    };
  }
}
