import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonInput, IonItem, IonLabel, IonList, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { UserServices } from '../services/user-services';
import { UserResponse } from '../interfaces/UserResponse';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../interfaces/paginatedResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controll-bar',
  templateUrl: './controll-bar.component.html',
  styleUrls: ['./controll-bar.component.scss'],
  imports: [IonInput, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, CommonModule]
})
export class ControllBarComponent implements OnInit {
  @Output() userQuery = new EventEmitter<string>();

  rows = 8;
  first = 0;
  searchTerm = '';
  statusFilter = false;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    const query = this.buildPageQuery();
   this.userQuery.emit(query);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchTerm = input?.value ?? '';
    this.getUsers();
  }

  onStatusChange(value: any): void {
    const selectedValue = typeof value === 'string' ? value : '';
    this.statusFilter = selectedValue === 'disabled';
    this.getUsers();
  }

  onSortDirectionChange(value: any): void {
    const normalizedValue = typeof value === 'string' ? value : 'asc';
    this.sortDirection = normalizedValue === 'desc' ? 'desc' : 'asc';
    this.getUsers();
  }

buildPageQuery(): string {
  const page = Math.max(1, Math.floor(this.first / this.rows) + 1);

  const params = new URLSearchParams({
    page: page.toString(),
    limit: this.rows.toString(),
  });

  const search = this.searchTerm.trim();

  if (search) {
    params.set('search', search);
  }

  params.set(
    'filter.deletedAt',
    this.statusFilter ? '$not:$null' : '$null'
  );

  params.set(
    'sortBy',
    `email:${this.sortDirection.toUpperCase()}`
  );

  return params.toString();
}
}
