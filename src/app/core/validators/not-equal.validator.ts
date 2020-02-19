import { ValidatorFn, AbstractControl } from "@angular/forms";

export class NotEqualValidator {
  static notEqualValues(val1: number): ValidatorFn {
    // console.log(val1);
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== null) {
        return control.value === val1
          ? { notequal: true } // return this incase of error
          : null; // there was not error
      }
      return null;
    };
  }
}
