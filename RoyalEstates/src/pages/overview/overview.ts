import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { ToastController, AlertController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})

export class OverviewPage {
  estate: any = {};
  includes = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public customApi: EstatesApiProvider, 
              public toastCtrl: ToastController, public userSettings: UserSettingsProvider, public alertCtrl: AlertController) {
    this.estate = customApi.getCurrentEstate();
    this.includes = userSettings.isInSavedEstates(this.estate);
  }

  doRefresh(refresher) {
    this.estate = this.customApi.getCurrentEstate();
    this.includes = this.userSettings.isInSavedEstates(this.estate);
    refresher.complete();
  }

  saveHandle() {
    if (this.includes) {
      this.showToastWithSelectors();
    } else {
      this.userSettings.addToSavedEstates(this.estate);
      this.includes = true;
    }
  }

  showToastWithSelectors() {
    const alert = this.alertCtrl.create({
      title: "Confirm Remove",
      message: "Are you sure you want to remove this estate from favourites?",
      buttons: [
        {
          text: "NO",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "YES",
          handler: () => {
            const toast = this.toastCtrl.create({
              message: "You have removed the estate from favourites.",
              duration: 3000,
              dismissOnPageChange: true
            });
            this.userSettings.removeFromSavedEstates(this.estate);
            this.includes = false;
            toast.present();
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OverviewPage");
  }

}
