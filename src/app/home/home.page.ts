import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobilecrudService } from '../core/mobilecrud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mobiles: any;
  mobileId: string;
  mobileName: string;
  mobileCompany: string;
  mobilePrice: number;
  mobileInches: number;
  mobileColors: string[];
  mobileImage: string;

  constructor(private mobilecrudSevice: MobilecrudService, private route:
    Router) { }
  ngOnInit() {
    this.mobilecrudSevice.read_Mobiles().subscribe(data => {
      this.mobiles = data.map(e => {
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
      console.log(this.mobiles);
    });
  }
  mobileTapped(mobile) {
    this.route.navigate(['/details', mobile.id]);
  }
}