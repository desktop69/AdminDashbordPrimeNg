import { AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmPassword(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
        return { 'passwordMismatch': true };
    }

    return null;
}
// Asynchronous password validator function
export function passwordValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      if (!control.value) {
        resolve(null);
      } else {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        setTimeout(() => {
          const valid = regex.test(control.value);
          resolve(valid ? null : { invalidPassword: true });
        }, 2000);
      }
    });
  }