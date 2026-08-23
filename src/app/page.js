'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });
        ScrollTrigger.normalizeScroll(true);

        let timeoutId;
        const observer = new ResizeObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        });

        if (typeof document !== 'undefined' && document.body) {
            observer.observe(document.body);
        }

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Certifications />
                <Achievements />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
