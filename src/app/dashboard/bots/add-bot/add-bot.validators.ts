import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AddBotValidators {
  static required(control: AbstractControl): ValidationErrors | null {
    return control
  }
}