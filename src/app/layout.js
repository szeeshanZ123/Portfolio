import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata = {
    title: 'Zeeshan Shaikh — Data Analyst | Aspiring Data Scientist | Python Developer',
    description: 'Portfolio of Zeeshan Shaikh, Data Analyst, Aspiring Data Scientist, and Python Developer specializing in Data Analytics, SQL, Power BI, Machine Learning, and Analytical Dashboards.',
    keywords: [
        'Zeeshan Shaikh',
        'Data Analyst',
        'Data Scientist',
        'Python Developer',
        'Power BI',
        'SQL',
        'Machine Learning',
        'Data Visualization',
        'Mumbai'
    ],
    authors: [{ name: 'Zeeshan Shaikh' }],
    openGraph: {
        title: 'Zeeshan Shaikh — Data Analyst | Aspiring Data Scientist | Python Developer',
        description: 'Data Analyst and Python Developer turning data into meaningful insights through analytics, visualization and intelligent solutions.',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr">
            <head>
                {/* DNS prefetch for faster font domain resolution */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <LanguageProvider>
                            <GlobalStyles />
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
