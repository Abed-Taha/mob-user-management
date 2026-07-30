import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonButton, IonIcon, IonPopover, IonList, IonItem } from "@ionic/angular/standalone";
import { PaginatedResponse } from '../interfaces/paginatedResponse';
import { UserResponse } from '../interfaces/UserResponse';
import { Observable } from 'rxjs';
import {  DatePipe} from '@angular/common';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { UserServices } from '../services/user-services';
import { UserFormComponent } from "../user-form/user-form.component";


@Component({
  selector: 'app-paginate-view',
  templateUrl: './paginate-view.component.html',
  styleUrls: ['./paginate-view.component.scss'],
  imports: [IonGrid, IonRow, IonCol, IonCard,
    IonCardHeader, IonCardContent, IonCardTitle,
    DatePipe, IonInfiniteScroll, IonInfiniteScrollContent,
    IonButton, IonIcon, IonPopover, IonList, IonItem, UserFormComponent],
})
export class PaginateViewComponent{
  private userService = inject(UserServices);
  private cdr = inject(ChangeDetectorRef)
  constructor(){
    addIcons({logoIonic})
  }
@Input() users$: Observable<PaginatedResponse<UserResponse>> | null = null;
@Input() users!: UserResponse[]
@Output() userQuery = new EventEmitter<string>();
@Input() pagination:any = {
  currentPage: 1,
  totalPages: 0 ,
  itemsPerPage: 8,
  totalItems: 0,
  sortBy: [],
  filter: {}
};


ngOnInit(){
  this.users$?.subscribe(resp => {
    this.pagination= resp.meta});
}

loadMore(event: any) {
  if ( this.pagination.currentPage >= this.pagination.totalPages) {
    event.target.complete();
    return;
  }
 this.pagination = {
  ...this.pagination,
  currentPage: this.pagination.currentPage + 1,
};
const query =  this.buildPageQuery();
this.userQuery.emit(query);

  event.target.complete();
}

buildPageQuery(): string {
  if (!this.pagination) {
    return '';
  }

  const params = new URLSearchParams();

  params.set('page', this.pagination.currentPage.toString());
  params.set('limit', this.pagination.itemsPerPage.toString());

  if (this.pagination.sortBy?.length) {
    const [column, direction] = this.pagination.sortBy[0];

    params.set(
      'sortBy',
      `${column}:${direction}`
    );
  }

  if (this.pagination.filter?.deletedAt) {
    params.set(
      'filter.deletedAt',
      this.pagination.filter.deletedAt
    );
  }

  if (this.pagination.search) {
    params.set('search', this.pagination.search.trim());
  }

  return params.toString();
}

menuOpen = false;
menuEvent: any;
selectedUser!: UserResponse;



closeModal(){
  this.menuOpen= false ;
}
deleteUser(id: number){
  this.menuOpen= false ;
  this.userService.deleteUser(id).subscribe(res => location.reload());
}
showUserForm = false;
openEditUser(): void {
  this.menuOpen = false;
  this.showUserForm = true;
}

openMenu(event: Event, user: UserResponse): void {
  this.menuEvent = event;
  this.selectedUser = user;
  this.menuOpen = true;
}

}
