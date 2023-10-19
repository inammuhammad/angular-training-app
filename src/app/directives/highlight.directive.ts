import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(
    private _element: ElementRef
  ) {

  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this._element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._element.nativeElement.style.backgroundColor = 'initial';
  }

}
