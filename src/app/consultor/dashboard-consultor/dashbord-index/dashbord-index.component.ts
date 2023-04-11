import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashbord-index',
  templateUrl: './dashbord-index.component.html',
  styleUrls: ['./dashbord-index.component.scss']
})
export class DashbordIndexComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.funFacts();
  }

  private funFacts(): void {
    const funFactElements = this.elementRef.nativeElement.querySelectorAll('.fun-fact') as NodeListOf<HTMLElement>;
    funFactElements.forEach((element) => {
        const factColor = element.getAttribute('data-fun-fact-color');

        if (factColor !== null) {
            const rgbaColor = this.hexToRgbA(factColor);
            if (rgbaColor !== undefined) {
                element.querySelector<HTMLElement>('.fun-fact-icon')!.style.backgroundColor = rgbaColor;
                element.querySelector<HTMLElement>('i')!.style.color = factColor;
            }
        }
    });
}


private hexToRgbA(hex: string): string | undefined {
  let c: string[];
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const hexValue = '0x' + c.join('');
    return 'rgba(' + [(parseInt(hexValue) >> 16) & 255, (parseInt(hexValue) >> 8) & 255, parseInt(hexValue) & 255].join(',') + ',0.07)';
  }
  return undefined;
}


}


