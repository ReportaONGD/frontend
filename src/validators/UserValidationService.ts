

export class UserValidationService {

    static emailValidator(control) {
        // RFC 2822 compliant regex
        // tslint:disable-next-line:max-line-length
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // {6,}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // (?=.*\d)       - Assert a string has at least one special character
        // (?=.*[a-z])       - Assert a string has at least one lowercase character
        // (?=.*[A-Z])       - Assert a string has at least one uppercase character
        if (control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, 'i')) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
}