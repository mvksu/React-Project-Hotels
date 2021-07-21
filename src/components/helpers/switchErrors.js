export function switchError(error) {
    switch (error) {
        case 'INVALID_EMAIL':
            return 'Niepoprawny email'
        case 'MISSING_PASSWORD':
            return 'Brakujące hasło'
        case 'INVALID_PASSWORD':
            return 'Niepoprawne hasło'
        case 'EMAIL_NOT_FOUND':
            return 'Nie znaleziona konta powiązanego z tym e-mailem'
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
            return 'Niepoprawne hasło: hasło powinno składać się z conajmniej 6 znaków'
        default:
            return error
    }

}