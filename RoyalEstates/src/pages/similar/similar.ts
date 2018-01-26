import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EstatesApiProvider } from "../../providers/estates-api/estates-api";
import _ from "lodash";
import { Events } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-similar',
  templateUrl: 'similar.html',
})
export class SimilarPage {
  location: any = {};
  estates: any;
  filteredEstates: any;
  locationName: any;
  filter: any;
  typeFilterHolder: any;
  typeFilterOn: any;
  typeFilter = {house: true, apartment: true, studio: true};

  constructor(public navCtrl: NavController, public navParams: NavParams, public customApi: EstatesApiProvider,
              public loadingController: LoadingController, public events: Events) {
    this.filter = navParams.get("filter") || "region";
    this.typeFilterHolder = navParams.get("typeFilterHolder") || "House";

    this.typeFilter = navParams.get("typeFilter") || {
      House: true,
      Apartment: true,
      Studio: true
    };

    this.typeFilterOn = this.typeFilter[this.typeFilterHolder];
    this.location = this.customApi.getCurrentLocation();
    if (!this.location) {
      let loader = this.loadingController.create({
        content: "Getting similar..",
        spinner: "dots"
      });
      const currentEstate = this.customApi.getCurrentEstate();
      loader.present().then(() => {
        this.customApi
          .getLocationEstateData({ id: currentEstate.locationId })
          .subscribe(data => {
            this.estates = data.estates;
            this.location = this.customApi.getCurrentLocation();
            this.estates = this.location.estates;
            this.locationName = this.location.location.Name;
            this.filterContent();
            loader.dismiss();
          });
      });
    } else {
      this.estates = this.location.estates;
      this.locationName = this.location.location.Name;
      this.filterContent();
    }
  }

  itemTapped($event, item) {
    this.customApi.setCurrentEstate(item);
    this.events.publish("estate:changed");
  }

  filterContent() {
    const that = this;
    this.filteredEstates = _.filter(this.estates, function(obj) {
      return that.typeFilter[obj.type];
    });
  }

  segmentChanged($event) {
    this.navCtrl.push(this.navCtrl.getActive().component, {
      filter: this.filter,
      typeFilter: this.typeFilter,
      typeFilterHolder: this.typeFilterHolder
    });
  }

  typeFilterUpdate() {
    this.typeFilterOn = this.typeFilter[this.typeFilterHolder];
  }

  toggleChange(typeFilterHolder) {
    this.typeFilter[typeFilterHolder] = this.typeFilterOn;
    this.filterContent();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SimilarPage");
  }
}
