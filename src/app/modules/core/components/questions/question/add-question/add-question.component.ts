import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../../services/question.service';
import { Question } from 'src/app/modules/master/models/question';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  sectionList:any

  constructor(public router:Router,public toastr:ToastrService,public fb:FormBuilder,public questionService:QuestionService){}

  ngOnInit(): void {
    this.getSection()
    this.addQuestionForm = this.fb.group({
      questionTypeId:['',[Validators.required]],
      sectionId:['',[Validators.required]],
      groupId:['',[Validators.required]],
      marks:['',[Validators.required]],
      Text:['',[Validators.required]],
      QuestionssoptionVm:this.fb.array([
        this.createOption(),
        this.createOption(),
        this.createOption(),
        this.createOption()
      ]),
    })
  }

  get questionsOptionsArray() {
    return this.addQuestionForm.get('QuestionssoptionVm') as FormArray;
  }

  getSection(){
    return this.questionService.getSection().subscribe((res)=>{
      console.log(res,'sectio')
      this.sectionList = res.data
    })
  }


  createOption(): FormGroup {
    return this.fb.group({
      optionText: ['',],
      isCorrect: [false],
      imagepath: ['']
    });
  }

  // Remove an option group
  

  submit(){
    console.log(this.addQuestionForm.value)
    if(this.addQuestionForm.valid){
      const formData = new FormData();
      const formValue = this.addQuestionForm.value;
  
      // Append simple fields to FormData
      Object.keys(formValue).forEach(key => {
        if (key !== 'QuestionssoptionVm') {
          formData.append(key, formValue[key]);
        }
      });
  
      // Append QuestionssoptionVm data to FormData
      const options = formValue.QuestionssoptionVm;
      options.forEach((option: any, index: number) => {
        Object.keys(option).forEach(optionKey => {
          formData.append(`QuestionssoptionVm[${index}].${optionKey}`, option[optionKey]);
        });
      });
  
      // Append file if selected
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFileName);
      }
  
      this.questionService.addQuestion(formData).subscribe((res)=>{
        console.log(res,' question')
        if (res.result.isSuccess){
          this.toastr.success(res.result.message)
          this.addQuestionForm.reset()
          this.router.navigateByUrl('/admin/question')
        }else{
          this.toastr.error(res.result.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error("Please fill all the details")
    }
  }



  cancel(){
    this.router.navigateByUrl('/admin/question')
  }


}
