import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  index: string;
  images: Array<any> = []
  constructor(private route: ActivatedRoute, private imageService: ImageService, private navCtrl: NavController) { 
    if(this.imageService.images.length == 0) this.navCtrl.navigateBack(["home"]);

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.index = this.route.snapshot.paramMap.get('id');
    this.images = this.imageService.images.map(x => {
      return {'path': x}
    });
    let shiftImageIndex = this.images.splice(0,Number(this.index));
    this.images = [...this.images, ...shiftImageIndex];
  }

}
