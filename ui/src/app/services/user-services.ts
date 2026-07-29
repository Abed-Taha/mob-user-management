import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../interfaces/paginatedResponse';
import { UserResponse } from '../interfaces/UserResponse';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private http = inject(HttpClient);

getUsers(query:string): Observable<PaginatedResponse<UserResponse>>{
  const queryParams: Record<string, string> = {};

  new URLSearchParams(query).forEach((value, key) => {
    queryParams[key] = value;
  });

  return this.http.get<PaginatedResponse<UserResponse>>(`${environment.apiUrl}/user`, {
    params: queryParams,
  });
}


disableUser(id : number) {
  return this.http.put(`${environment.apiUrl}/user/${id}` , {});
}

restoreUser(id: number){
  return this.http.patch(`${environment.apiUrl}/user/${id}/restore`, {})
}

deleteUser(id: number){
  return this.http.delete(`${environment.apiUrl}/user/${id}`);
}

create(user: object){
  return this.http.post(`${environment.apiUrl}/user`, user);
}

update(user: any){
  return this.http.patch(`${environment.apiUrl}/user/${user.id}` , user);
}

}
