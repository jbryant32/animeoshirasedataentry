import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import * as $ from "jquery";
@Component({
  selector: "app-movie-info",
  templateUrl: "./movie-info.component.html",
  styleUrls: ["./movie-info.component.css"]
})
export class MovieInfoComponent implements OnInit {
  @Input() movieData;
  @Input() openMovieEvent: EventEmitter<any>;
  movie: Object = {
    poster:"",
    backdrop:"",
    youTubeLink:"",
    theaterUrl:"",
    englishSubbed:"",
    englishDubbed:"",
    showing:"",
    showings:"",
    overview:"",
    id:"",
    title:""
  };

  constructor() {}

  ngOnInit() {
    this.openMovieEvent.subscribe(movie => {
      this.movie = movie;
      $("#movie-info").animate({ top: "0%" }, 500, () => {});
    });
  }
  hide() {
    $("#movie-info").animate({ top: "100%" }, 500, () => {});

  }
}
