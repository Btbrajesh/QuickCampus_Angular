import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/question.service';
import { Question } from 'src/app/modules/master/models/question';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

  addQuestionForm!:FormGroup
  selectedFile: File | null = null;
  selectedFileName!: string;
  data!:Question

  constructor(public fb:FormBuilder,public questionService:QuestionService){}

  ngOnInit(): void {
    this.addQuestionForm = this.fb.group({
      questionType:['',[Validators.required]],
      questionSection:['',[Validators.required]],
      questionGroup:['',[Validators.required]],
      marks:['',[Validators.required]],
      question:['',[Validators.required]],
      options:['',[Validators.required]],
      file:['',[Validators.required]]
    })
  }

  submit(){
    console.log(this.addQuestionForm.value)
    if(this.addQuestionForm.valid){
      this.data = this.addQuestionForm.value
      this.data.file = this.selectedFileName
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