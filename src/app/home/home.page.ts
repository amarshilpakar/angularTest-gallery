import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  images: Array<any> = [];
  subscription: Subscription
  constructor(public loadingController: LoadingController, private imageService: ImageService,private navCtrl: NavController,) {}

  ionViewWillEnter() {
    this.images = [];
    this.getImageData(null, true);
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async getImageData(event, flag) {
    let loading;
    if(flag) {
      loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...'
      });
      await loading.present();
    }
    this.subscription = this.imageService.getImage().subscribe(
      (res) => {
        this.images = [...this.images, ...res];
        if(event) event.target.complete();
        if(flag) loading.dismiss();
      },
      (err) => {
        if(event) event.target.complete();
        if(flag) loading.dismiss();
        console.error(err);
        alert('Error while fetching image data');
      }
    )
  }

  gotoDetail(index) {
    this.imageService.images = this.images;
    this.navCtrl.navigateForward(["detail", index]);
  }
}
