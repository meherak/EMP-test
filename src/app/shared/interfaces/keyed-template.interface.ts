import { KeyedTemplateDirective } from '@shared/directives';

export interface TemplateHostComponent {
    registerTemplate(key: string, templateDirective: KeyedTemplateDirective): void;
}

// export interface KeyedTempalteDirectiveObject {
//     [key: string]: KeyedTemplateDirective;
// }