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
      text: ['',[Validators.required,Validators.maxLength(1000)]],
      QuestionssoptionVm: this.fb.array([])
    });
  }

  loadQuestionData() {
    const questionId = this.route.snapshot.params['id'];
    this.questionService.getQuestionById(questionId).subscribe((questionData: any) => {
      this.editQuestionForm.patchValue(questionData.data);
      this.patchOptionsArray(questionData.data.questionssoptionVm);
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
      this.questionList = res.data
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
      const questionId = this.route.snapshot.params['id'];
      formData.append('QuestionId', questionId);

      const options = formValue.QuestionssoptionVm;
      options.forEach((option: any, index: number) => {
        Object.keys(option).forEach(optionKey => {
          formData.append(`QuestionssoptionVm[${index}].${optionKey}`, option[optionKey]);
        });
        formData.set(`QuestionssoptionVm[${index}].questionId`,questionId)
      });
  
      // Append file if selected
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFileName);
      }

      
  
      this.questionService.updateQuestion(formData).subscribe((res)=>{
        if (res.isSuccess){
          this.toastr.success(res.message)
          this.editQuestionForm.reset()
          this.router.navigateByUrl('/admin/question')
        }else{
          this.toastr.error(res.message)
        }
      },err=>{
        this.toastr.error(err)
      })
    }else{
      this.toastr.error("Please fill all the details")
    }
  }

  addOption() {
    const optionGroup = this.createOption(); // Create option group
    this.optionArray.push(optionGroup); // Add option group to form array
  }
  
  removeOption(index: number) {
    this.optionArray.removeAt(index); // Remove option group from form array
  }

  createOption(): FormGroup {
    return this.fb.group({
      optionText: ['',[Validators.required]],
      isCorrect: [false],
      imagepath: ['']
    });
  }

  cancel(){
    this.router.navigateByUrl('/admin/question')
  }

}
