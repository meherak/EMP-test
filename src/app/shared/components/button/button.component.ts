import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'emp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() label = '';
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() loading: boolean | null = false;

  @Input() cssClass: string = 'btn-default';

  // Disable click event when disabled state = TRUE
  @HostBinding('style.pointer-events') get pEvents(): string {
    if (this.disabled) {
      return 'none';
    }
    return 'auto';
  }

  constructor() { }

  ngOnInit(): void {
    // this.cssClass = this.cssClass.map(
    //   (class) => {
    //     return `btn-${class}`
    //   }
    // );
  }
}
