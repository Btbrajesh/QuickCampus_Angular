import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  addQuestionForm!:FormGroup
  selectedFile: File | null = null;
  selectedFileName!: string;
  data:any

  constructor(public fb:FormBuilder,public questionService:QuestionService){}

  ngOnInit(): void {
    this.addQuestionForm = this.fb.group({
      questionType:[''],
      section:[''],
      group:[''],
      marks:[''],
      question:[''],
      option:[''],
      file:['']
    })
  }

  submit(){
    console.log(this.addQuestionForm.value)
    if(this.addQuestionForm.valid){
      this.data = this.addQuestionForm.value
      this.questionService.addQuestion(this.data).subscribe((res)=>{
        console.log(res,'question')
      })
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;  
  }



}
