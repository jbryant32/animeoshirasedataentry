import { Component, OnInit } from "@angular/core";
import { Observable, from, ObservableInput } from "../../../node_modules/rxjs";
import { map,filter } from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import { Router } from "../../../node_modules/@angular/router";
@Component({
  selector: "app-entries",
  templateUrl: "./entries.component.html",
  styleUrls: ["./entries.component.css"]
})
export class EntriesComponent implements OnInit {
   movies$: Observable<Object>;
   private localMovies:Array<Object>=[];

  constructor(private httpClient:HttpClient,private router:Router) {}

  ngOnInit() {


    this.movies$ = this.httpClient.get('http://localhost:62203/api/v1/allMovies')
    .pipe(map((value)=> {this.localMovies.push(value); return value}))

  }
  editMovie(e,i)
  {
      localStorage.setItem("editedMovie", JSON.stringify(this.localMovies[0][i]));
      console.log(JSON.parse(localStorage.getItem("editedMovie")));
      this.router.navigate(["edit"]);

  }
}
