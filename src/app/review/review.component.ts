import { Component, OnInit, EventEmitter } from "@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { Observable } from "rxjs";
import { RestMovie } from "../Models/rest-movie";
@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"]
})
export class ReviewComponent implements OnInit {
  moviesNewEntries: Object[] = [];
  moviesUpdateEntries: Object[] = [];
  postingNewEntrie = false;
  postingUpdate = false;
   openMovieEvent = new EventEmitter();
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.moviesNewEntries = JSON.parse(localStorage.getItem("cartItemsNewEntry"));
    console.log(this.moviesNewEntries);
    this.moviesUpdateEntries = JSON.parse(localStorage.getItem("moviesForUpdate"));
    console.log(this.moviesUpdateEntries);
  }
  fireOpenMovieInfo(movie) {
      this.openMovieEvent.emit(movie);
  }

  removeNewEntrie(index) {
    this.moviesNewEntries.splice(index, 1);
  }
  saveChangesNE() {
    if (confirm("Save Changes?")) {
      try {
        alert("Save OK");
        localStorage.setItem(
          "cartItemsNewEntry",
          JSON.stringify(this.moviesNewEntries)
        );
      } catch (error) {
        console.log(error);
        alert("Save Fail");
      }
    }
  }
  removeUpdateEntrie(index) {
    this.moviesUpdateEntries.splice(index, 1);
  }

  //TODO cart for updates
  saveChangesUE() {
    if (confirm("Save Changes?")) {
      try {
        alert("Save OK");
        localStorage.setItem(
          "moviesForUpdate",
          JSON.stringify(this.moviesUpdateEntries)
        );
        console.log(JSON.parse(localStorage.getItem("moviesForUpdate")));
      } catch (error) {
        console.log(error);
        alert("Save Fail");
      }
    }
  }
  //creates a movies for the backend rest point
  createRESTMovieObject(movie: Object): RestMovie {
    var REST = new RestMovie();
    REST.Title = movie["title"];
    REST.id = movie["id"];
    REST.offeringSubbed = movie["englishSubbed"];
    REST.offeringDubbed = movie["englishDubbed"];
    REST.MovieDates = movie["showings"];
    REST.theatricalReleaseStartDate =  movie["showings"][0];
    REST.youTube = movie["youTubeLink"];
    REST.poster_path = movie["poster"];
    REST.backdrop_path = movie["backdrop"];
    REST.overview = movie["overview"];
    REST.theaterUrl = movie["theaterUrl"];
    REST.rating = movie["ratings"];
    REST.postedDate = movie["postedDate"];
    REST.banner = movie["banner"] || "NA";
    return REST;
  }
  commitUpdate() {
    console.log( this.moviesNewEntries );
    this.postingUpdate = true;
    const sampleUrl =
      "http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk";

    this.http.post(sampleUrl, {}).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        alert("Post Failed!");
        this.postingUpdate = false;
      },
      () => {
        console.log("done");
        this.postingUpdate = true;
      }
    );
  }
  commitNewEntries() {
    var REST: RestMovie[] = [];
    this.postingNewEntrie = true;
    this.moviesNewEntries.forEach(movie => {
      REST.push(this.createRESTMovieObject(movie));
    });
    console.log("movies for db");
    console.log(REST);

      const url = "https://animeoshirasev2.azurewebsites.net/newentry/post"
    this.http.post(url, REST).subscribe(
      data => {
        console.log(data);
        this.postingNewEntrie = false;
      },
      error => {
        console.log(error);
        alert("Post Failed!");
        this.postingNewEntrie = false;
      },
      () => {
        console.log("done");
        this.postingNewEntrie = false;
      }
    );
  }
}
