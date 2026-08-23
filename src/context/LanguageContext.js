'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTranslation } from '@/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const locale = 'en';
    const dir = 'ltr';
    const isRTL = false;

    const t = useCallback((key) => {
        return getTranslation(locale, key);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
    }, []);

    return (
        <LanguageContext.Provider value={{ locale, setLocale: () => {}, t, dir, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        return {
            locale: 'en',
            setLocale: () => {},
            t: (key) => getTranslation('en', key),
            dir: 'ltr',
            isRTL: false,
        };
    }
    return context;
}
