import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }

  getAllQuestion(){
    return this.http.get<any>(environment.apiUrl +'/Question/QuestionManage')
  }

  getQuestionList(pageStart:number,pageSize:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Question/QuestionManage?'+'pageStart='+pageStart+'&pageSize='+pageSize);
  }

  addQuestion(data:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/Question/AddQuestion',data)
  }

  updateQuestion(data:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/Question/UpdateQuestion',data)
  }

  searchData(searchTerm: string,pageStart:number,pageSize:number): Observable<any[]>{
    return this.http.get<any>(environment.apiUrl +'/Question/QuestionManage?search='+searchTerm+'&pageStart='+pageStart+'&pageSize='+pageSize);
  }

  deleteQuestion(id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/Question/DeleteQuestionById?QuestionId='+id)
  }

  getSection():Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Question/GetAllSectionList')
  }

  getQuestionById(id:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Question/GetQuestionById?questionId='+id)
  }

  getGroup(){
    return this.http.get<any>(environment.apiUrl+'/Question/GetAllGroupsList')
  }

  getQuestionType(){
    return this.http.get<any>(environment.apiUrl+'/Question/GetAllQuestionTypes')
  }

  questionActiveInactive(id:any){
    return this.http.get<any>(environment.apiUrl+'/Question/QuestionActiveInactive?QuestionId='+id)
  }

}
