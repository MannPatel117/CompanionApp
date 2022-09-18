import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,

  ) {
    
   }
    
  get name(){
    return this.credentials.get('name');
  }
  get email(){
    return this.credentials.get('email');
  }

  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['',[Validators.required, Validators.nullValidator]],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async register(){
    const loading = await this.loadingController.create(
      {
        spinner: "circular",
        translucent: true,
      }
    );
    await loading.present();
    
    const user = await this.authService.register(this.credentials.value);

    await loading.dismiss();
      
    if(user)
    {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else
    {
      this.showAlert('Registration Failed', 'Please Try Again!');
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user)
    {
      this.router.navigateByUrl('/home', {replaceUrl: true});
    }
    else
    {
      this.showAlert('Login Failed', 'Please Try Again!');
    }
  }

  goToLogin(){
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }
  async showAlert(header,message)
  {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
