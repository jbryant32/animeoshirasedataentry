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
import { Console } from "../../../node_modules/@angular/core/src/console";

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
  cart: Object[] = [];
  savedMovieData: Object;

  //https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  ngOnInit() {
    this.userInputForm = this.fb.group({
      movieTitle: ["", Validators.required],
      movieId: ["", Validators.required],
      showDates: ["", [Validators.required, this.validateDates]],
      posterPath: ["", Validators.required],
      backDropPath: ["", Validators.required],
      englishDubbed: ["", Validators.required],
      englishSubbed: ["", Validators.required],
      youTubeLink: ["", Validators.required],
      theaterUrl: ["", Validators.required],
      searchBar: ""
    });
    this.initCart();
  }
  submit() {}
  saveChanges() {
    var updated = {
      title: this.userInputForm.get("movieTitle").value || "NA",
      id: this.userInputForm.get("movieId").value || "NA",
      showings: (() => {
        var dates = this.userInputForm.get("showDates").value.split(",");
        return dates;
      })(),
      poster: this.userInputForm.get("posterPath").value || "NA",
      backdrop: this.userInputForm.get("backDropPath").value || "NA",
      englishDubbed: this.userInputForm.get("englishDubbed").value || "NA",
      englishSubbed: this.userInputForm.get("englishSubbed").value || "NA",
      youTubeLink: this.userInputForm.get("youTubeLink").value || "NA",
      theaterUrl: this.userInputForm.get("theaterUrl").value || "NA"
    };
    this.savedMovieData = updated;
    console.log(this.savedMovieData);
    localStorage.setItem("savedEdit", JSON.stringify(this.savedMovieData));
  }
  initCart()
  {
    if (!localStorage.getItem("cartItems")) {

      localStorage.setItem("cartItems", JSON.stringify(this.cart));
    } else {

      this.cart = JSON.parse(localStorage.getItem("cartItems"));

    }
  }
  addToCart() {
    this.saveChanges();
    this.cart.push(this.savedMovieData);
    localStorage.setItem("cartItems", JSON.stringify(this.cart));
    var check = JSON.parse(localStorage.getItem("cartItems"));

  }
  search() {
    console.log("...searching");
    var url = `https://api.themoviedb.org/3/search/movie?api_key=88c90f084b54e6c2a73b7295abdf08c0&language=en-US&query=${
      this.userInputForm.get("searchBar").value
    }&page=1&include_adult=false`;
    this.movies$ = this.http.get(url).pipe(
      map(value => {

        return value["results"];
      }),
      map(results => {

        this.localMovies.push(results);
        return results;
      })
    );
  }
  selectedMovie($event, movie) {

    this.userInputForm.patchValue({
      movieTitle: movie.title,
      movieId: movie.id,
      posterPath: movie.poster_path,
      backDropPath: movie.backdrop_path
    });
  }
  validateDates(c: FormControl): { [key: string]: boolean } | null {
    var dateStringArry = [];
    var verify = null;
    if (typeof c.value === typeof {}) {
      var s: string = "";
      c.value.forEach((element, index) => {
        if (index !== 0) s += "," + element;
        else {
          s += element;
        }
      });
      dateStringArry = s.split(",");
    }
    if (typeof c.value === typeof "") {
      dateStringArry = c.value.split(",");
    }
    dateStringArry.forEach((word, index) => {
      var match = word.match(/(\d{2}\/\d{2}\/\d{4}\b)/gi);
      var matchLetters = word.match(/[A-z]/gi);

      if (match && !matchLetters) {
        verify = null;
      } else {
        verify = { dates: false };
        return verify;
      }
    });

    console.log("loop exited and continued");
    return verify;
  }
  waiting() {}
}
