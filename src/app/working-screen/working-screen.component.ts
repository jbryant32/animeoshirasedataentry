import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-working-screen',
  templateUrl: './working-screen.component.html',
  styleUrls: ['./working-screen.component.css']
})
export class WorkingScreenComponent implements OnInit {
@Input() hide:boolean = false;
get hidden():boolean{
return this.hide
}
  constructor() { }

  ngOnInit() {
  }

}
