import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Events } from "ionic-angular";
import _ from "lodash";

@Injectable()
export class UserSettingsProvider {
  savedEstates = [];

  constructor(public http: HttpClient, private storage: Storage, public events: Events) {

    storage.get("savedEstates").then(val => {
      const propVal = JSON.parse(val)
      if (!propVal || propVal.length == 0) {
        this.savedEstates = [];
        this.storage.set("savedEstates", "[]");
      } else {
        this.savedEstates = propVal;
      }
      this.events.publish("savedEstates:changed");
    });
  }

  addToSavedEstates(estate: any) {
    this.savedEstates.push(estate);
    this.storage.set("savedEstates", JSON.stringify(this.savedEstates));
    this.events.publish("savedEstates:changed");
  }

  getSavedEstates() {
    return this.savedEstates;
  }

  isInSavedEstates(estate: any) {
    return _.some(this.savedEstates, function(est) {
        return est.refNumber === estate.refNumber;
    });
  }

  removeFromSavedEstates(estate: any) {
    _.remove(this.savedEstates, estate);
    this.storage.set("savedEstates", JSON.stringify(this.savedEstates));
    this.events.publish("savedEstates:changed");
  }
}
