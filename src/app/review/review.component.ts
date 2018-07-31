import { Component, OnInit } from "@angular/core";
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
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.moviesNewEntries = JSON.parse(localStorage["cartItemsNewEntry"]);
    this.moviesUpdateEntries = JSON.parse(localStorage["moviesForUpdate"]);
    console.log(this.moviesUpdateEntries);
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
  createRESTMovieObject(movie: Object): RestMovie {
    var REST = new RestMovie();
    REST.Title = movie["title"];
    REST.id = movie["id"];
    REST.offeringSubbed = movie["subbed"];
    REST.offeringDubbed = movie["dubbed"];
    REST.MovieDates = movie["showings"];
    REST.theatricalReleaseStartDate = movie[movie["showings"][0]];
    REST.youTube = movie["trailer"];
    REST.poster_path = movie["poster_sm"];
    REST.backdrop_path = movie["backdrop_sm"];
    REST.overview = movie[""];
    REST.theaterUrl = movie["theaterUrl"];
    REST.rating = movie["rating"];
    REST.postedDate = movie[""];
    REST.banner = movie["banner"] || "NA";
    return REST;
  }
  commitUpdate() {
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
    console.log(this.moviesNewEntries);
    const sampleUrl =
      "http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk";
    this.http.post(sampleUrl, {}).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        alert("Post Failed!");
        this.postingNewEntrie = false;
      },
      () => {
        console.log("done");
        this.postingNewEntrie = true;
      }
    );
  }
}
