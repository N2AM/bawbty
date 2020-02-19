import { ValidatorFn, AbstractControl } from "@angular/forms";

export class OnlyNumbers {
  static onlyNumbers(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== null) {
        return control.value.includes("-") ||
          control.value.includes("+") ||
          control.value.includes("e")
          ? { notnumber: true } // return this incase of error
          : null; // there was not error
      }
      return null;
    };
  }
}
