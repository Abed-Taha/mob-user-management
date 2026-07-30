import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { UserResponse } from '../interfaces/UserResponse';
import { UserServices } from '../services/user-services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonModal,
    IonTitle,
    IonToolbar
  ],
})
export class UserFormComponent {

  @Input() isOpen = false;
  @Input() message = '';

  private _selectedUser: UserResponse | null = null;

  @Input()
  set selectedUser(user: UserResponse | null) {
    this._selectedUser = user;

    if (user) {
      this.id = user.id;

      this.userForm.patchValue({
        fullName: user.fullName,
        email: user.email,
      });

    } else {
      this.id = 0;
      this.userForm.reset();
    }
  }

  get selectedUser(): UserResponse | null {
    return this._selectedUser;
  }


  @Output() closed = new EventEmitter<void>();

  private userService = inject(UserServices);
  private fb = inject(FormBuilder);

  id = 0;

  userForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });


  closeUserModal(): void {

    this.isOpen = false;
    this.userForm.reset();
    this._selectedUser = null;
    this.id = 0;

    this.closed.emit();
  }


  saveUser(): void {

    if (this.userForm.invalid) {
      return;
    }


    if (this.selectedUser) {

      this.userService.update(this.userForm.value, this.id)
        .subscribe({
          next: () => {
            this.closeUserModal();
          },
          complete: () => {
            location.reload();
          }
        });

    } else {

      this.userService.create(this.userForm.value)
        .subscribe({
          next: () => {
            this.closeUserModal();
          },
          complete: () => {location.reload();}
        });
    }
  }
  openUserModal(user?: UserResponse): void {
  this.selectedUser = user ?? null;
  this.isOpen = true;
}
}
