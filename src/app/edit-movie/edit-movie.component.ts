import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators
} from "../../../node_modules/@angular/forms";
import { Router } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-edit-movie",
  templateUrl: "./edit-movie.component.html",
  styleUrls: ["./edit-movie.component.css"]
})
export class EditMovieComponent implements OnInit {
  editFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}
  private _originalCopy: any;
  private _updatedCopy: any;
  private savedMovie: Object;
  private moviesForUpdate: Object[] = [];
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
    try {
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
      this.editFormGroup
        .get("ratingsGroup")
        .setValue({ ratings: currentEdit["rating"] || "G" });
      this.originalForm = this.editFormGroup.value;
    } catch (error) {
      console.log(error);
      alert("No Entry");
      this.router.navigate(["entries"]);
    }
  }
  review() {
    this.router.navigate(["review"]);
  }

  addToCart() {
    try {
      var data = {
        id: this.editFormGroup.get("id").value,
        title: this.editFormGroup.get("title").value,
        trailer: this.editFormGroup.get("trailer").value,
        showings: this.editFormGroup.get("showings").value,
        poster_sm: this.editFormGroup.get("poster").value,
        backdrop_sm: this.editFormGroup.get("backdrop").value,
        subbed: this.editFormGroup.get("subbed").value,
        dubbed: this.editFormGroup.get("dubbed").value,
        theaterUrl: this.editFormGroup.get("theaterUrl").value,
        rating: this.editFormGroup.get("ratingsGroup.ratings").value
      };
      this.savedMovie = data; //save the movie data
      this.moviesForUpdate.push(data);
      //Save movie
      localStorage.setItem("editedMovie", JSON.stringify(this.savedMovie));
      localStorage.setItem(
        "moviesForUpdate",
        JSON.stringify(this.moviesForUpdate)
      );
      console.log(JSON.parse(localStorage.getItem("moviesForUpdate")));
      alert("Add Succeded")
    } catch (error) {
      console.log("add to cart failed");
      console.log(error);
      alert("Add to Cart failed");
    }
    var data = {
      id: this.editFormGroup.get("id").value,
      title: this.editFormGroup.get("title").value,
      trailer: this.editFormGroup.get("trailer").value,
      showings: this.editFormGroup.get("showings").value,
      poster_sm: this.editFormGroup.get("poster").value,
      backdrop_sm: this.editFormGroup.get("backdrop").value,
      subbed: this.editFormGroup.get("subbed").value,
      dubbed: this.editFormGroup.get("dubbed").value,
      theaterUrl: this.editFormGroup.get("theaterUrl").value,
      rating: this.editFormGroup.get("ratingsGroup.ratings").value
    };
    this.savedMovie = data; //save the movie data
    this.moviesForUpdate.push(data);
    //Save movie
    localStorage.setItem("editedMovie", JSON.stringify(this.savedMovie));
    localStorage.setItem(
      "moviesForUpdate",
      JSON.stringify(this.moviesForUpdate)
    );
    console.log(JSON.parse(localStorage.getItem("moviesForUpdate")));
  }
  save() {
    try {
      alert("Save Ok!");
      console.log("save");
      var data = {
        id: this.editFormGroup.get("id").value,
        title: this.editFormGroup.get("title").value,
        trailer: this.editFormGroup.get("trailer").value,
        showings: this.editFormGroup.get("showings").value,
        poster_sm: this.editFormGroup.get("poster").value,
        backdrop_sm: this.editFormGroup.get("backdrop").value,
        subbed: this.editFormGroup.get("subbed").value,
        dubbed: this.editFormGroup.get("dubbed").value,
        theaterUrl: this.editFormGroup.get("theaterUrl").value,
        rating: this.editFormGroup.get("ratingsGroup.ratings").value
      };
      this.savedMovie = data;
      localStorage.setItem("editedMovie", JSON.stringify(this.savedMovie));
      console.log(JSON.parse(localStorage.getItem("editedMovie")));
    } catch (error) {
      console.log("save error");
      console.log(error);
      alert("Save Failed!");
    }
  }
  //runs in canDeactivate when page navigation occurs
  checkDirty(): boolean {
    this.updatedForm = this.editFormGroup.value;
    var originalValues = this.originalForm;
    var updatedValues = this.updatedForm;
    var keys = Object.keys(originalValues);
    var proceed: boolean = true;
    keys.forEach((Key, index) => {
      if (index !== 9)
        if (originalValues[Key] !== updatedValues[Key]) {
          //TODO URL comparison not evaulating properly on index 9 need to fix
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
      poster_sm: this.editFormGroup.get("poster").value,
      backdrop_sm: this.editFormGroup.get("backdrop").value,
      subbed: this.editFormGroup.get("subbed").value,
      dubbed: this.editFormGroup.get("dubbed").value,
      theaterUrl: this.editFormGroup.get("theaterUrl").value,
      rating: this.editFormGroup.get("ratingsGroup.ratings").value
    };
  }
}
