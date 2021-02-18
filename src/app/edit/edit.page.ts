import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MobilecrudService } from '../core/mobilecrud.service';
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
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private mobilecrudService: MobilecrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.mobileForm = new FormGroup({
      title: new FormControl(''),
      price: new FormControl(''),
      shortDescription: new FormControl(''),
      description: new FormControl(''),
      images: new FormControl('')
    });

    this.id = this.activatedrouter.snapshot.params.id;
    this.mobilecrudService.read_Mobiles().subscribe(data => {
      let mobiles = data.map(e => {       
        return {
          id: e.payload.doc.id,
          isEdit: false,
          title: e.payload.doc.data()['title'],
          price: e.payload.doc.data()['price'],
          shortDescription: e.payload.doc.data()['shortDescription'],
          description: e.payload.doc.data()['description'],
          images: e.payload.doc.data()['images']
        };
      })
      // tengo todos los móviles
      mobiles.forEach(element => {
        if(element.id == this.id){
          this.mobile=element;
          this.mobileForm.get('title').setValue(this.mobile.title),
          this.mobileForm.get('price').setValue(this.mobile.price),
          this.mobileForm.get('shortDescription').setValue(this.mobile.shortDescription),
          this.mobileForm.get('description').setValue(this.mobile.description),
          this.mobileForm.get('images').setValue(this.mobile.images)
        }
      });

      console.log(this.mobile);
    });

  }

  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Actualizar movil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.mobile=this.mobileForm.value;
            this.mobilecrudService.update_Mobile(this.id,this.mobile);
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

}