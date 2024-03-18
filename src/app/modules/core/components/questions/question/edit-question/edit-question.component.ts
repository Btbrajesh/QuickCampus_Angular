import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/modules/core/services/question.service';
import { Question } from 'src/app/modules/master/models/question';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit{

  selectedFile: File | null = null;
  selectedFileName!: string;
  data!:Question
  sectionList:any
  groupList:any
  questionList:any
  editQuestionForm!: FormGroup;


  constructor(public route:ActivatedRoute,public router:Router,public toastr:ToastrService,public fb:FormBuilder,public questionService:QuestionService){}

  ngOnInit(): void {
    this.initForm();
    this.loadQuestionData();
    this.getGroup();
    this.getSection();
    this.getQuestion();
  }

  initForm() {
    this.editQuestionForm = this.fb.group({
      questionId: [''],
      questionTypeId: ['',[Validators.required]],
      sectionId: ['',[Validators.required]],
      groupId: ['',[Validators.required]],
      marks: ['',[Validators.required]],
      text: ['',[Validators.required]],
      QuestionssoptionVm: this.fb.array([])
    });
  }

  loadQuestionData() {
    const questionId = this.route.snapshot.params['id'];
    this.questionService.getQuestionById(questionId).subscribe((questionData: any) => {
      this.editQuestionForm.patchValue(questionData.data);
      this.patchOptionsArray(questionData.data.options);
    });
  }

  patchOptionsArray(options: any[]) {
    if (options && options.length) {
      const optionsFormArray = this.editQuestionForm.get('QuestionssoptionVm') as FormArray;
      options.forEach(option => {
        optionsFormArray.push(this.fb.group(option));
      });
    }
  }

  get optionArray(): FormArray {
    return this.editQuestionForm.get('QuestionssoptionVm') as FormArray;
  }

  // Helper method to add a new option FormGroup to the FormArray

  getSection(){
    return this.questionService.getSection().subscribe((res)=>{
      this.sectionList = res.data
    })
  }

  getGroup(){
    return this.questionService.getGroup().subscribe((res)=>{
      this.groupList = res.data
    })
  }

  getQuestion(){
    return this.questionService.getQuestionType().subscribe((res)=>{
      this.questionList = res
    })
  }


  submit(){
    if(this.editQuestionForm.valid){
      const formData = new FormData();
      const formValue = this.editQuestionForm.value;
  
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

      const questionId = this.route.snapshot.params['id'];
      formData.append('questionId', questionId);
  
      this.questionService.addQuestion(formData).subscribe((res)=>{
        if (res.result.isSuccess){
          this.toastr.success(res.result.message)
          this.editQuestionForm.reset()
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
