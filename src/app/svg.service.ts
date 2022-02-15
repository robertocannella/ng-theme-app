import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  properties = {
    width: 700,
    height: 450,
    vbWidth: 400,
    vbHeight: 150,
    xmlns: 'http://www.w3.org/2000/svg',
    svgId: 'coding-outlet'
  }
}
