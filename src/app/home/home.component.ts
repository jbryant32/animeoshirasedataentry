import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "../../../node_modules/@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  userInputForm: FormGroup;
  ngOnInit() {
    this.userInputForm = this.fb.group([{
      movieTitle: ["", Validators.required],
      movieId: ["", Validators.required],
      showDates:["",Validators.required],
      posterPath:["",Validators.required],
      backDropPath: "",
      englishDubbed: "",
      englishSubbed: ["", Validators.required],
      youTubeLink:["",Validators.required],
      theaterUrl: ["", Validators.required]
    }]);
  }
  submit() {

  }
}
