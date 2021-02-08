import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobiledbService } from '../core/mobiledb.service';
import { IMobile } from '../shared/interfaces';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  id: string;
  public mobile: IMobile;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private mobiledbService: MobiledbService,
    public toastController: ToastController
  ) { }
  
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.mobiledbService.getItem(this.id).then(
      (data: IMobile) => this.mobile = data
    );
  }
  editRecord(mobile) {
    this.router.navigate(['edit', mobile.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar móvil',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.mobiledbService.remove(id);
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
