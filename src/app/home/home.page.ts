import { Component, OnInit } from '@angular/core';
import { IMobile } from '../shared/interfaces';
import { MobiledbService } from '../core/mobiledb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public mobiles: IMobile[];
  mobilesinit: IMobile[] = [
    {
      id: "0",
      title: "Huawei P40",
      price: 464,
      shortDescription: "Huawei P40 - Smartphone",
      description: "Huawei P40 - Smartphone 128GB 8GB RAM Dual Sim Silver",
      image: "https://img01.huaweifile.com/eu/es/huawei/pms/product/6901443378951/428_428_59A45A930B1C9F4B26F7D437DA5B8B994F8CC108CD3A4EC0mp.png"

    },
    {
      id: "1",
      title: "Iphone 12",
      price: 1.509,
      shortDescription: "Apple iPhone 12 Pro",
      description: "Nuevo Apple iPhone 12 Pro (512 GB) - Grafito",
      image: "https://i1.wp.com/www.movilzona.es/app/uploads/2020/10/iphone-12-sin-fondo-negro-1.png?ssl=1"
    },
    {
      id: "2",
      title: "Galaxy S21",
      price: 859,
      shortDescription: "Samsung Galaxy S21",
      description: `Samsung Galaxy S21 5G, Gris, 128 GB, 8 GB RAM, 6.2" Dynamic AMOLED 120Hz, Exynos 2100, 4000 mAh`,
      image: "https://images.samsung.com/is/image/samsung/p6pim/latin/galaxy-s21/gallery/latin-galaxy-s21-ultra-5g-g988-sm-g998bzsktpa-368318086?$720_576_PNG$"
    },
    {
      id: "3",
      title: "Xiaomi Mi 10T",
      price: 469,
      shortDescription: "Xiaomi Mi 10T 5G",
      description: `Xiaomi Mi 10T 5G, Plata, 128GB, 6GB RAM, 6.67" FHD+, Snapdragon 865 + Mi True Wireless Earphones Lite`,
      image: "https://i01.appmifile.com/webfile/globalweb/chenyang/J3S-108-Silvery.png"
    },
    {
      id: "4",
      title: "Realme 6 Pro",
      price: 271,
      shortDescription: "Realme 6 Pro",
      description: `Smartphone de 6.6", 8 GB RAM + 128 GB ROM, Procesador OctaCore Snapdragon 720G, Cuádruple Cámara AI 64MP, Dual Sim, Color Lightning Red`,
      image:"https://calinegocios.co/wp-content/uploads/2020/07/foto-principal-todos-disponibles_0005_Capa-6.png"
    }
  ]
  constructor(private mobiledbService: MobiledbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.mobiles !== undefined) {
      this.mobiles.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.mobiledbService.empty()) {
      this.mobilesinit.forEach(mobile => {
        this.mobiledbService.setItem(mobile.id, mobile);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.mobiledbService.getAll().then(
      (data) => this.mobiles = data
    );
  }
  mobileTapped(mobile) {
    this.route.navigate(['details', mobile.id]);
  }
}
