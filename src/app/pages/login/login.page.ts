import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMockService } from 'src/app/services/auth-mock.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthMockService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    this.authService.login(this.email.trim(), this.password.trim()).subscribe({
      next: () => {
        loading.dismiss();
        this.router.navigate(['/recipes']);
      },
      error: async (err) => {
        loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Credenciales inválidas. Intenta con test@test.com / 123456',
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        });
        await toast.present();
      }
    });
  }

}
