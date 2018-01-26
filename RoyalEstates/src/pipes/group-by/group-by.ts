
import { Pipe, PipeTransform } from "@angular/core";
import { extractDeepPropertyByMapKey, isFunction } from "../helpers";

@Pipe({
  name: "groupBy"
})
export class GroupByPipe implements PipeTransform {
  transform(input: any, discriminator: any = [], delimiter: string = "|"): any {
    if (!Array.isArray(input) || input.length == 0) {
      return input;
    }
    const a = this.groupBy(input, discriminator, delimiter);
    const keys = Object.keys(a);
    let payload = [];
    for (let i = 0; i < keys.length; i++) {
      payload.push([keys[i], a[keys[i]]]);
    }
    
    return payload;
  }

  private groupBy(list: any[], discriminator: any, delimiter: string) {
    return list.reduce((acc: any, payload: string) => {
      const key = this.extractKeyByDiscriminator(
        discriminator,
        payload,
        delimiter
      );

      acc[key] = Array.isArray(acc[key])
        ? acc[key].concat([payload])
        : [payload];

      return acc;
    }, {});
  }

  private extractKeyByDiscriminator(
    discriminator: any,
    payload: string,
    delimiter: string
  ) {
    if (isFunction(discriminator)) {
      return (<Function>discriminator)(payload);
    }

    if (Array.isArray(discriminator)) {
      return discriminator
        .map(k => extractDeepPropertyByMapKey(payload, k))
        .join(delimiter);
    }

    return extractDeepPropertyByMapKey(payload, <string>discriminator);
  }
}