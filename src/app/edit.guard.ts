import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate
} from "@angular/router";
import { Observable, of } from "rxjs";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";

@Injectable({
  providedIn: "root"
})
export class EditGuard implements CanDeactivate<EditMovieComponent> {
  canDeactivate(
    component: EditMovieComponent
  ): boolean | Observable<boolean> | Promise<boolean> {

    try {
         if(!component.checkDirty())
    {
      if(confirm("Unsaved Changes will be lost leave anyway?")){
        return of(true);
      }
      else{
        return false;
      }
    }
    return of(true);
    } catch (error) {
      console.log(error);
      return of(true)
    }

  }
}
