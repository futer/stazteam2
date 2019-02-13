import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function CorrectLogin(controlPassword: string) {
    return (formGroup: FormGroup) => {
        const password = formGroup.controls[controlPassword];

        if (password.errors && !password.errors.CorrectLogin) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        password.setErrors({ CorrectLogin: true });
    };
}
