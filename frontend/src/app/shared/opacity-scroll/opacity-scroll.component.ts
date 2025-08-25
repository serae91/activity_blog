import { Component, Input } from '@angular/core';
import { smoothstep } from '../../utils/math.utils';

@Component({
  selector: 'app-opacity-scroll',
  templateUrl: './opacity-scroll.component.html',
  styleUrls: ['./opacity-scroll.component.scss'],
})
export class OpacityScrollComponent {
  @Input()
  topInPx = 34 + 64;
  @Input()
  bottomInPx = 64;
  @Input()
  widthInPercent = 25;
  @Input()
  leftInPx = 64;
  @Input()
  scrollOpacityHeightInPx = 100;

  scrollIndicatorVisibility = 'hidden';

  scroll(e: any): void {
    this.scrollIndicatorVisibility = 'hidden';
    const scrollChildren = [...e.target['children'][0]['children']];
    const scrollTop: number = e.target['scrollTop'];
    scrollChildren.forEach((child) => {
      const offsetTop: number = child.offsetTop;
      const remainingScrollOpacityHeight =
        offsetTop - scrollTop + this.scrollOpacityHeightInPx;
      if (remainingScrollOpacityHeight <= 0) {
        this.scrollIndicatorVisibility = 'visible';
      }
      const opacity = smoothstep(
        remainingScrollOpacityHeight / this.scrollOpacityHeightInPx
      );
      if (-offsetTop - scrollTop < child.clientHeight && opacity < 0.3) {
        child.setAttribute('style', 'opacity: 0.3');
        return;
      }
      if (-offsetTop - scrollTop >= child.clientHeight) {
        child.setAttribute('style', 'visibility: hidden');
        return;
      }
      child.setAttribute('style', 'opacity: ' + opacity);
    });
  }

  getHeightStyle() {
    return {
      top: this.topInPx + 'px',
      bottom: this.bottomInPx + 'px',
      width: this.widthInPercent + '%',
      left: this.leftInPx + 'px',
    };
  }

  getScrollIndicatorStyle() {
    return { visibility: this.scrollIndicatorVisibility };
  }
}
