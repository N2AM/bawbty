import { ValidatorFn, AbstractControl } from "@angular/forms";

export class AlreadyInsertedValidator {
  static AlreadyInsertedValues(vals: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== null) {
        console.log(vals, control.value);
        console.log(vals.find(val => val.driver_national_id === control.value));
        console.log(
          vals.find(val => val.driver_national_id === control.value)
            ? { inserted: true } // return this incase of error
            : null
        );
        return vals.find(val => val.driver_national_id === control.value)
          ? { inserted: true } // return this incase of error
          : null; // there was not error
      }
      return null;
    };
  }
}
