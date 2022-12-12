import {
  NgControl,
  Validators,
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { Input, Injector, Component, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';

import { FORM_FIELD_DEFAULT_ERRORS_MSG } from '@shared/utils';

@Component({
  selector: 'emp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
    },
    // {
    //   multi: true,
    //   provide: NG_VALIDATORS,
    //   useExisting: SimpleInputComponent
    // }
  ],
})
export class InputComponent implements AfterViewInit, ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() minlength = 0;
  @Input() group = false;
  @Input() placeholder = '';
  @Input() maxlength = 52100;
  @Input() id = Math.random();
  @Input() errorMessages: { [key: string]: string } = {};

  public inputValue = '';
  public disabled = false;
  public serverErrorMsg = '';
  public control: FormControl = new FormControl();

  constructor(private injector: Injector) {}

  get value(): string {
    return this.inputValue;
  }

  // sets the value used by the ngModel of the element
  set value(val: string) {
    this.inputValue = val;
    this.onChange(val);
    this.onTouch(val);
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  /**
   * This will will write the value to the view if the the value changes occur on the model programmatically
   * @param value
   */
  writeValue(value: string) {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // When the element is touched, this method will get called
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }

  public isRequired(): boolean {
    return this.control && this.control.hasValidator(Validators.required);
  }
}
