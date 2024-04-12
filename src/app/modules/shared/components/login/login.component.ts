import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm!: FormGroup;
  loading:boolean=false;
  submitted = false;
  hidePassword: boolean = true;
  error = '';
  loginInFlight: any;
  loginData: { userName: string, password: string } = { userName: '', password: '' };
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authenticationService :AuthenticationService,
    public spinnerService:NgxSpinnerService) {
   
  }

  ngOnInit() {
    this.loading = true;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      check: [false],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submitForm(){
    this.spinnerService.show()
    this.submitted = true;
    if (this.loginForm.invalid) {
              return;
    }
    if (this.loginInFlight) {
      this.spinnerService.show()
      console.log('request is in flight...');
      return;
    }
    this.loginData.userName = this.loginForm.value.email;
    this.loginData.password = this.loginForm.value.password;
    this.loginInFlight = this.authenticationService.login(this.loginData.userName,this.loginData.password).subscribe(resp =>{
      if(resp.isSuccess){
        this.spinnerService.hide()
        this.loginInFlight = null;
        this.toastr.success(resp.message,'',{timeOut:1500});
        this.router.navigateByUrl('/dashboard');
      }else{
        this.spinnerService.hide()
        this.loginInFlight = null;
        this.toastr.error(resp.message);
      }
    },err =>{
      this.spinnerService.hide()
      this.toastr.error(err);
      this.loginInFlight = null;
    });
  }
}
