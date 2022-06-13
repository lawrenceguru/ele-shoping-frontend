export default function maskEmail(email: string): string {
    let emailAddress = email[0].toLowerCase() + email.slice(1, email.indexOf("@") + 1).replace(/.(?!$)/g, '*') +
        email.slice(email.indexOf("@") + 1);

    return emailAddress;
}