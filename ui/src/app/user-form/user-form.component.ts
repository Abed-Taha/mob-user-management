import { Component, EventEmitter, inject, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    FormsModule,
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
export class UserFormComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() selectedUser: UserResponse | null = null;
  @Input() message = '';

  @Output() closed = new EventEmitter<void>();

  private userService = inject(UserServices);
  private fb = inject(FormBuilder);
  id:number = 0 ;
  userForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser']) {
      if (this.selectedUser) {
        this.userForm.patchValue({
          fullName: this.selectedUser.fullName,
          email: this.selectedUser.email,
        });
        this.id = this.selectedUser.id;
      } else {
        this.userForm.reset();
      }
    }
  }

  openUserModal(user?: UserResponse): void {
    this.selectedUser = user ?? null;
    this.isOpen = true;
  }

  closeUserModal(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.selectedUser = null;
      this.userForm.reset();
      this.closed.emit();
    }
  }

  saveUser(): void {

    if(this.selectedUser){
    if (this.userForm.valid) {
      this.userService.update(this.userForm.value , this.id).subscribe({
        next: res => location.reload(),
      });
      this.closeUserModal();
    }
  }else {
    if (this.userForm.valid) {
      this.userService.create(this.userForm.value).subscribe({
        next: res => location.reload(),
      });
      this.closeUserModal();
    }
  }
  }
}
