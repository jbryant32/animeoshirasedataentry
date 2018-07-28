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

  ngOnInit() {
    //Get the selected value that has been save to local storage
    var currentEdit = JSON.parse(localStorage.getItem("editedMovie"));
    console.log(currentEdit);
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
  }
  submit() {
    var data = {
      id:this.editFormGroup.get("id").value,
      title:this.editFormGroup.get("title").value,
      trailer:this.editFormGroup.get("trailer").value,
      showings:this.editFormGroup.get("showings").value,
      poster:this.editFormGroup.get("poster").value,
      backdrop:this.editFormGroup.get("backdrop").value,
      subbed:this.editFormGroup.get("subbed").value,
      dubbed:this.editFormGroup.get("dubbed").value,
      theaterUrl:this.editFormGroup.get("theaterUrl").value,
      rating : this.editFormGroup.get("ratingGroup.rating").value
    }



  }
}
