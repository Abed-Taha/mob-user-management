import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/angular/standalone";
import { PaginatedResponse } from '../interfaces/paginatedResponse';
import { UserResponse } from '../interfaces/UserResponse';
import { Observable } from 'rxjs';
import { AsyncPipe , DatePipe} from '@angular/common';
import { UserServices } from '../services/user-services';

@Component({
  selector: 'app-paginate-view',
  templateUrl: './paginate-view.component.html',
  styleUrls: ['./paginate-view.component.scss'],
  imports: [IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, DatePipe, IonContent , IonInfiniteScroll , IonInfiniteScrollContent],
})
export class PaginateViewComponent{
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
  console.log(this.pagination.currentPage , this.pagination?.totalPages)
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
setTimeout(() => {
  event.target.complete()
} , 2000);
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
}
