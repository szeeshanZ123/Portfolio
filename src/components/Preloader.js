'use client';
import { useState, useEffect } from 'react';
import styled, { keyframes, useTheme as useStyledTheme } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const fadeOut = keyframes`
  to { opacity: 0; visibility: hidden; }
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
  animation: ${({ $fadeOut }) => ($fadeOut ? fadeOut : 'none')} 0.6s ease forwards;
  pointer-events: ${({ $gone }) => ($gone ? 'none' : 'all')};
`;

const SvgContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;
  }

  .flash-overlay {
    fill: ${({ theme }) => theme.colors.bg};
    animation: fadeOutFlash 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    pointer-events: none;
  }

  .animated-content {
    transform-origin: 960px 480px;
    animation: cinematicReveal 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  @keyframes fadeOutFlash {
    0% { opacity: 1; }
    70% { opacity: 0; }
    100% { opacity: 0; display: none; }
  }

  @keyframes cinematicReveal {
    0% {
      transform: scale(2);
      opacity: 0;
      filter: blur(25px);
    }
    30% { opacity: 1; }
    100% {
      transform: scale(1.15);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @media (max-width: 1024px) {
    @keyframes cinematicReveal {
      0% {
        transform: scale(1.6);
        opacity: 0;
        filter: blur(25px);
      }
      30% { opacity: 1; }
      100% {
        transform: scale(0.9);
        opacity: 1;
        filter: blur(0px);
      }
    }
  }

  @media (max-width: 768px) {
    @keyframes cinematicReveal {
      0% {
        transform: scale(1.2);
        opacity: 0;
        filter: blur(20px);
      }
      30% { opacity: 1; }
      100% {
        transform: scale(0.4);
        opacity: 1;
        filter: blur(0px);
      }
    }
  }

  .line-anim {
    transform-origin: 640px 530px;
    opacity: 0;
    animation: growLine 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.5s;
  }

  .text-slide-anim {
    opacity: 0;
    animation: slideRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.8s;
  }

  @keyframes growLine {
    0% { transform: scaleY(0); opacity: 0; }
    100% { transform: scaleY(1); opacity: 1; }
  }

  @keyframes slideRight {
    0% { transform: translateX(-150px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  .text-name {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 900;
    font-size: 68px;
    letter-spacing: 2px;
    fill: ${({ theme }) => theme.colors.text};
  }

  .text-title {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 6px;
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

const FallbackLoader = styled.div`
  position: absolute;
  bottom: 40px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 2px;
  text-align: center;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default function Preloader() {
  const { t } = useLanguage();
  const theme = useStyledTheme();
  const [fadingOut, setFadingOut] = useState(false);
  const [gone, setGone] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Check if bot or already shown in this session
    const isBot = typeof navigator !== 'undefined' && /bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent);
    const alreadyShown = typeof window !== 'undefined' && sessionStorage.getItem('portfolio-preloader-shown');

    if (isBot || alreadyShown) {
      setGone(true);
      window.dispatchEvent(new Event('preloader-finished'));
      return;
    }

    try {
      sessionStorage.setItem('portfolio-preloader-shown', 'true');
    } catch (e) {}

    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 1800);

    const showFallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 800);

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(showFallbackTimer);
    };
  }, []);

  const handleComplete = () => {
    if (fadingOut || gone) return;
    setFadingOut(true);
    setTimeout(() => {
      setGone(true);
      window.dispatchEvent(new Event('preloader-finished'));
    }, 500);
  };

  if (gone) return null;

  return (
    <Wrapper $fadeOut={fadingOut} $gone={gone}>
      <SvgContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
              <stop offset="0%" stopColor={theme.colors.bg} />
              <stop offset="100%" stopColor={theme.colors.bgSecondary} />
            </radialGradient>
            <clipPath id="reveal-mask">
              <rect x="400" y="300" width="1400" height="600" />
            </clipPath>
          </defs>

          <rect width="1920" height="1080" fill="url(#bg-gradient)" />

          <g className="animated-content">
            {/* Elegant Data Analytics / Tech Icon Mark */}
            <g transform="translate(420, 470) scale(1.3)">
              <circle cx="40" cy="40" r="36" fill="none" stroke={theme.colors.accent} strokeWidth="3" opacity="0.4" />
              <circle cx="40" cy="40" r="24" fill={theme.colors.accent} opacity="0.15" />
              <path d="M25 48 L35 34 L45 42 L55 26" fill="none" stroke={theme.colors.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="25" cy="48" r="3" fill={theme.colors.accent} />
              <circle cx="35" cy="34" r="3" fill={theme.colors.accent} />
              <circle cx="45" cy="42" r="3" fill={theme.colors.accent} />
              <circle cx="55" cy="26" r="4" fill={theme.colors.accent} />
            </g>

            <line className="line-anim" x1="580" y1="440" x2="580" y2="620" stroke={theme.colors.borderHover} strokeWidth="3" />

            <g clipPath="url(#reveal-mask)">
              <g transform="translate(630, 530)">
                <g className="text-slide-anim">
                  <text className="text-name" x="0" y="10" textAnchor="start">
                    ZEESHAN SHAIKH
                  </text>
                  <text className="text-title" x="5" y="60" textAnchor="start">
                    DATA ANALYST | DATA SCIENTIST | PYTHON DEVELOPER
                  </text>
                </g>
              </g>
            </g>
          </g>

          <rect className="flash-overlay" width="1920" height="1080" />
        </svg>
      </SvgContainer>
      <FallbackLoader $show={showFallback && !fadingOut}>{t('preloader.loading')}</FallbackLoader>
    </Wrapper>
  );
}
