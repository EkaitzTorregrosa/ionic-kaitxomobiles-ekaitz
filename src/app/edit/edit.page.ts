import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MobiledbService } from '../core/mobiledb.service';
import { IMobile } from '../shared/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  mobile: IMobile;
  mobileForm: FormGroup;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private mobiledbService: MobiledbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedroute.snapshot.params.id;
    this.mobiledbService.getItem(this.id).then(
      (data: IMobile) => {
        this.mobile = data
        this.mobileForm.get('title').setValue(this.mobile.title);
        this.mobileForm.get('price').setValue(this.mobile.price);
        this.mobileForm.get('shortDescription').setValue(this.mobile.shortDescription);
        this.mobileForm.get('description').setValue(this.mobile.description);
        this.mobileForm.get('image').setValue(this.mobile.images);
      }
    );
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
      header: 'Editar móvil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editMobile();
            this.router.navigate(['home']);
          }
        },
        {
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

  editMobile() {
    this.mobile = this.mobileForm.value;
    let id = this.id;
    this.mobiledbService.remove(this.id);
    this.mobile.id = id;
    this.mobiledbService.setItem(this.mobile.id, this.mobile);
    console.warn(this.mobileForm.value);
  }

}
