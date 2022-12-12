import {
  Host,
  Input,
  NgZone,
  Optional,
  Renderer2,
  Directive,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { DataGridComponent } from '@shared/components';

@Directive({
  selector: '[empTemplateKey]',
})
export class KeyedTemplateDirective {
  private key: string = '';
  @Input() set empTemplateKey(key: any) {
    this.parentGrid.registerTemplate(key, this);
  }

  get empTemplateKey() {
    return this.key;
  }

  constructor(
    @Host() @Optional() public parentGrid: DataGridComponent,
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private renderer: Renderer2,
    private zone: NgZone
  ) {}

  public render(renderData: any) {
    const _that = this;
    let childView;
    if (this.zone.isStable) {
      childView = this.zone.run(function () {
        return _that.renderTemplate(renderData);
      });
    } else {
      childView = this.renderTemplate(renderData);
      // =========== WORKAROUND =============
      // https://github.com/angular/angular/issues/12243
      /* tslint:disable:no-string-literal */
      childView['detectChanges']();
      /* tslint:enable:no-string-literal */
      // =========== /WORKAROUND =============
    }
    return childView.rootNodes;
  }

  private renderTemplate(renderData: any) {
    const _that = this;
    const childView = _that.vcRef.createEmbeddedView(this.templateRef, {
      $implicit: renderData.model,
    });
    const container = this.getElement(renderData.container);
    if (renderData.container) {
      let element;
      for (element of childView.rootNodes) {
        _that.renderer.appendChild(container.nativeElement, element);
      }
    }
    return childView;
  }

  private getElement(element: any) {
    return element.get ? element.get(0) : element;
  }

  get template(): TemplateRef<any> {
    return this.templateRef;
  }
}
