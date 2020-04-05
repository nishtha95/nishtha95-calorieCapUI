import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Meal } from '../models/Meal';
import { ReportRequest } from '../models/ReportRequest';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private messageSource = new BehaviorSubject(new Meal());
  meal = this.messageSource.asObservable();

  constructor( private http : HttpClient) { }

  register(user: User) {
    return this.http.post<any>(`http://localhost:8080/register`, user);
}
changeMeal(meal: Meal) {
  this.messageSource.next(meal);
}
addMeal(meal: Meal){
  return this.http.post<any>(`http://localhost:8080/user/addMeal`, meal);
}
getCaloriesReport(reportRequest: ReportRequest){
  return this.http.post<any>(`http://localhost:8080/user/getCalorieRecord`, reportRequest);
}
deleteMeal(meal: any){
  return this.http.post<any>(`http://localhost:8080/user/deleteMeal`, meal);
}
editSuggestedCalorieCount(user: User){
  return this.http.post<any>(`http://localhost:8080/user/editSuggestedCalories`, user);
}
fetchUsers(){
  return this.http.get<any>(`http://localhost:8080/admin/fetchAllUsers`);
}
deleteUser(user: String){
  console.log(user);
  return this.http.post<any>(`http://localhost:8080/admin/deleteUser`, user);
}
deleteMealsByUsername(reportRequest:ReportRequest){
  return this.http.post<any>(`http://localhost:8080/admin/deleteMealsByUsername`, reportRequest);
}
}
