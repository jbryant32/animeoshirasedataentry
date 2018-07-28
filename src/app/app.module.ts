import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Route, Router,CanActivate } from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule, FormBuilder, FormsModule } from "@angular/forms";
import { EntriesComponent } from "./entries/entries.component";
import { HttpClient } from "../../node_modules/@angular/common/http";
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, EntriesComponent, EditMovieComponent, NavigationBarComponent, CheckoutComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
    RouterModule.forRoot([
      {
        path: "home",
        component: HomeComponent,
        canActivate:[AuthGuard]

      },
      {
        path: "login",
        component: LoginComponent,


      },
      {
        path:"entries",
        component:EntriesComponent,
        canActivate:[AuthGuard]

      },
      {
        path:"edit",
        component:EditMovieComponent,
        canActivate:[AuthGuard]

      },
      {
        path:"checkOut",
        component:CheckoutComponent,
        canActivate:[AuthGuard]

      }
    ])
  ],
  providers: [FormBuilder,HttpClient,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
