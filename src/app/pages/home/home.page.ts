import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController
    //private authFire: AngularFireAuth,
    //public userDataProvider: UserdataProvider,
    //public rodadaProvider: RodadaProvider
    ) {

  }


  goToAbout(){
    this.navCtrl.navigateForward('/about');
  }
  

}
