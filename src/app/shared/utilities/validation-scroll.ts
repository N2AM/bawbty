import { FormGroup } from "@angular/forms";

export function scrollTo(el: Element): void {
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToError(): void {
  const firstElementWithError = document.querySelector(".ng-invalid");
  scrollTo(firstElementWithError);
}

export async function scrollIfFormHasErrors(form: FormGroup): Promise<any> {
  await form.invalid;
  scrollToError();
}
