import { en } from './en';

export const locales = { en };
export const localeList = [
    { code: 'en', name: 'English', flag: '/flags/en.svg' },
];

export function detectLocale() {
    return 'en';
}

export function getTranslation(locale, key) {
    const keys = key.split('.');
    let value = en;
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return key;
        }
    }
    return value;
}
