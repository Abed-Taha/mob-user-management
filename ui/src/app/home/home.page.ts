import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ControllBarComponent } from "../controll-bar/controll-bar.component";
import { PaginateViewComponent } from "../paginate-view/paginate-view.component";
import { UserServices } from '../services/user-services';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../interfaces/paginatedResponse';
import { UserResponse } from '../interfaces/UserResponse';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ControllBarComponent, PaginateViewComponent],
})
export class HomePage {
  private userService = inject(UserServices);
  private cdr = inject(ChangeDetectorRef);

  users: UserResponse[] = [];
  pagination: any;
  users$ : Observable<PaginatedResponse<UserResponse>> | null = null;

   getUsers(event: any){
    const query = event;
    this.userService.getUsers(query).subscribe(resp => this.users = [...this.users , ...resp.data])
    this.cdr.detectChanges();
  }
  filterUsers(event: any){
    const query = event;
    this.userService.getUsers(query).subscribe(resp => {
      this.users = resp.data
      this.pagination = resp.meta;
    })
    this.cdr.detectChanges();
  }

}
