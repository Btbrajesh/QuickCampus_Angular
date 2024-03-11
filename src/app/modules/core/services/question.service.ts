import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public http:HttpClient) { }

  getQuestionList():Observable<any>{
    return this.http.get<any>(environment.apiUrl +'/Question/QuestionManage');
  }

  addQuestion(data:any):Observable<any>{
    // var formData = new FormData;
    // formData.append('questionTypeName',data.questionTypeName)
    // formData.append('questionSection',data.questionSection)
    // formData.append('questionGroup',data.questionGroup)
    // formData.append('marks',data.marks)
    // formData.append('question',data.question)
    // formData.append('QuestionssoptionVm',data.QuestionssoptionVm)
    return this.http.post<any>(environment.apiUrl + '/Question/addorupdatequestion',data)
  }

  deleteQuestion(id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl+'/Question/deletequestion?questionId='+id)
  }

  getSection():Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/Section/GetAllSection')
  }
}
