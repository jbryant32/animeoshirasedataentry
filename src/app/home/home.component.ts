import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule
} from "../../../node_modules/@angular/forms";
import { Observable } from "../../../node_modules/rxjs";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { pipe } from "../../../node_modules/@angular/core/src/render3/pipe";
import { map } from "../../../node_modules/rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  userInputForm: FormGroup;
  movies$: Observable<any>;
  localMovies: Object[] = [];

  //https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  ngOnInit() {
    this.userInputForm = this.fb.group({
      movieTitle: ["", Validators.required],
      movieId: ["", Validators.required],
      showDates: ["", Validators.required],
      posterPath: ["", Validators.required],
      backDropPath: "",
      englishDubbed: "",
      englishSubbed: ["", Validators.required],
      youTubeLink: ["", Validators.required],
      theaterUrl: ["", Validators.required],
      searchBar: ""
    });
  }
  submit() {}
  search() {
    console.log( this.userInputForm.get("searchBar"));
    console.log("...searching");
    var url = `https://api.themoviedb.org/3/search/movie?api_key=88c90f084b54e6c2a73b7295abdf08c0&language=en-US&query=${
      this.userInputForm.get("searchBar").value
    }&page=1&include_adult=false`;
    this.movies$ = this.http.get(url).pipe(
      map(value => {
        console.log(value);
        return value["results"];
      })
    );
  }
  waiting() {}
}
