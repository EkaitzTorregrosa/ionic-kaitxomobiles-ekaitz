import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MobiledbService } from '../core/mobiledb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMobile } from '../shared/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  mobile: IMobile;
  mobileForm: FormGroup;
  constructor(
    private router: Router,
    private mobiledbService: MobiledbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.mobileForm = new FormGroup({
      title: new FormControl(''),
      price: new FormControl(''),
      shortDescription: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar móvil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveMobile();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveMobile() {
    this.mobile = this.mobileForm.value;
    let nextKey = this.mobile.title.trim();
    this.mobile.id = nextKey;
    this.mobiledbService.setItem(nextKey, this.mobile);
    console.warn(this.mobileForm.value);
  }
}
