'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiExternalLink, FiGithub, FiLayers, FiDatabase,
  FiBarChart2, FiCpu, FiCode, FiTrendingUp, FiServer
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = styled.section`
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg || '#050505'};
  color: ${({ theme }) => theme.colors.text || 'white'};
  z-index: 5;
  overflow: clip;

  .font-anton {
    font-family: 'Anton', sans-serif;
  }
  .custom-projects-cursor {
    pointer-events: none;
    position: fixed;
    top: 0; left: 0;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: #ffffff;
    mix-blend-mode: difference;
    z-index: 9999;
    opacity: 0;
    transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    will-change: transform, width, height;
    @media (pointer: coarse) {
        display: none;
    }
  }
  .custom-projects-cursor.active {
    opacity: 1;
  }
  .custom-projects-cursor.hovered {
    width: 80px; height: 80px;
    background: rgba(255, 255, 255, 1);
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  direction: ltr;
  background-color: ${({ theme }) => theme.colors.bg || '#050505'};
`;

const Header = styled.header`
  position: absolute;
  top: 6rem;
  left: 2rem;
  z-index: 50;
  mix-blend-mode: difference;
  pointer-events: none;
  
  @media (min-width: 768px) {
    top: 7rem;
    left: 3rem;
  }
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: 0.05em;
  font-size: 1.25rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: white;
  font-weight: 800;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollHintWrapper = styled.div`
  position: absolute;
  top: 6rem;
  right: 2rem;
  z-index: 50;
  mix-blend-mode: difference;
  pointer-events: none;
  
  @media (min-width: 768px) {
    top: 7rem;
    right: 3rem;
  }
`;

const ScrollHintText = styled.p`
  color: white;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border || 'rgba(255, 255, 255, 0.2)'};
  z-index: 50;
  pointer-events: none;
  
  @media (min-width: 768px) {
    bottom: 3rem;
    left: 3rem;
    right: 3rem;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent || '#10B981'};
  transform-origin: left;
  transform: scaleX(0);
  will-change: transform;
`;

const ScrollContainer = styled.div`
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
  direction: ltr;
`;

const Slide = styled.section`
  width: 120vw;
  @media (max-width: 768px) {
    width: 160vw;
  }
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg || '#050505'};
`;

const TitleParallaxOutline = styled.h2`
  position: absolute;
  z-index: 0;
  font-size: clamp(3rem, 14vw, 12rem);
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.9;
  text-align: center;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'};
  max-width: 85vw;
`;

const TitleParallaxSolid = styled.h2`
  position: absolute;
  z-index: 20;
  color: white;
  font-size: clamp(3rem, 14vw, 12rem);
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.9;
  text-align: center;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: difference;
  opacity: 0.85;
  max-width: 85vw;
`;

const ImageWrapper = styled.div`
  width: 80vw;
  height: 62vh;
  background-color: #12121e;
  overflow: hidden;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  
  @media (min-width: 768px) {
    width: 46vw;
    height: 68vh;
  }
`;

const BrowserBar = styled.div`
  height: 2.2rem;
  background-color: #1a1a28;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  z-index: 25;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.$color};
`;

const BrowserAddressBar = styled.div`
  flex: 1;
  height: 1.3rem;
  background-color: #0f0f18;
  border-radius: 6px;
  margin-left: 0.75rem;
  max-width: 50%;
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ImageInnerContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 40%, rgba(30, 41, 59, 0.8), #0a0a14);
`;

const ProjectImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: top center !important;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${ImageWrapper}:hover & img {
    transform: scale(1.03);
  }
`;

const VisualGraphicWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ $color }) => `radial-gradient(circle at 50% 30%, ${$color}22 0%, rgba(10,10,20,0.95) 75%)`};
`;

const IconBackdrop = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 24px;
  background: ${({ $color }) => `${$color}20`};
  border: 1px solid ${({ $color }) => `${$color}50`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.75rem;
  color: ${({ $color }) => $color};
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px ${({ $color }) => `${$color}30`};
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%);
  z-index: 10;
  transition: opacity 0.4s;
  pointer-events: none;
`;

const ProjectInfo = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  
  @media (min-width: 768px) {
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
  }
`;

const ProjectRole = styled.p`
  color: ${({ theme }) => theme.colors.accent || '#34D399'};
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RoleIndex = styled.span`
  background: ${({ theme }) => theme.colors.accentGlow || 'rgba(16,185,129,0.2)'};
  color: ${({ theme }) => theme.colors.accent || '#10B981'};
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.75rem;
`;

const ProjectTitleText = styled.h3`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
`;

const ProjectDescText = styled.p`
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  max-width: 32rem;
`;

const TechTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
`;

const TechTagItem = styled.span`
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
`;

const ActionButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ActionBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${({ theme }) => theme.colors.gradient};
  color: #ffffff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const ProjectIconMap = {
  1: FiBarChart2, // Academic Performance
  2: FiTrendingUp, // UPI Dashboard
  3: FiDatabase, // Food Delivery
  4: FiCpu, // Titanic
  5: FiServer, // Employee DB
  6: FiCode, // Habit Tracker
};

export default function Projects() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const cursorRef = useRef(null);

  const [sectionHeight, setSectionHeight] = useState('400vh');
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const updateHeight = () => {
      const totalHeight = (projects.length * window.innerWidth * 0.9) + window.innerHeight;
      setSectionHeight(`${totalHeight}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const winWidth = window.innerWidth;
        const isMobile = winWidth <= 768;
        const slideWidth = isMobile ? winWidth * 1.6 : winWidth * 1.2;
        const totalScrollDistance = (projects.length - 1) * slideWidth;
        const targetX = -totalScrollDistance;

        gsap.set(containerRef.current, { x: 0 });
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left' });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        });

        tl.to({}, { duration: 0.05 });

        tl.to(containerRef.current, {
          x: targetX,
          ease: "none",
          duration: 0.95
        }, 0.05);

        if (progressBarRef.current) {
          tl.to(progressBarRef.current, {
            scaleX: 1,
            ease: "none",
            duration: 0.95
          }, 0.05);
        }

        const slides = containerRef.current.querySelectorAll('.slide');
        slides.forEach((slide) => {
          const img = slide.querySelector('.parallax-bg');
          if (img) {
            tl.to(img, {
              x: "5%",
              ease: "none",
              duration: 0.95
            }, 0.05);
          }

          const titles = slide.querySelectorAll('.title-parallax');
          titles.forEach((title) => {
            tl.to(title, {
              x: "-5%",
              ease: "none",
              duration: 0.95
            }, 0.05);
          });
        });

      }, sectionRef);

      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let targetCursorX = cursorX;
    let targetCursorY = cursorY;
    let animationFrameId;

    const handleMouseMove = (e) => {
      targetCursorX = e.clientX;
      targetCursorY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCursor = () => {
      if (!sectionRef.current) {
        animationFrameId = requestAnimationFrame(animateCursor);
        return;
      }

      const sectionRect = sectionRef.current.getBoundingClientRect();

      if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
        if (cursorRef.current && !cursorRef.current.classList.contains('active')) {
          cursorRef.current.classList.add('active');
        }
      } else {
        if (cursorRef.current && cursorRef.current.classList.contains('active')) {
          cursorRef.current.classList.remove('active');
        }
      }

      cursorX += (targetCursorX - cursorX) * 0.15;
      cursorY += (targetCursorY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseEnterCard = () => cursorRef.current?.classList.add('hovered');
  const handleMouseLeaveCard = () => cursorRef.current?.classList.remove('hovered');

  return (
    <ProjectsSection id="projects" ref={sectionRef} style={{ height: sectionHeight }}>
      <div ref={cursorRef} className="custom-projects-cursor" />

      <StickyContainer>
        <Header>
          <HeaderTitle>
            Featured<br />Projects
          </HeaderTitle>
        </Header>

        <ScrollHintWrapper>
          <ScrollHintText>
            {t('projects.scrollHint')}
          </ScrollHintText>
        </ScrollHintWrapper>

        <ProgressBarWrapper>
          <ProgressBar ref={progressBarRef} />
        </ProgressBarWrapper>

        <ScrollContainer ref={containerRef}>
          {projects.map((projet, index) => {
            const IconComp = ProjectIconMap[projet.id] || FiLayers;
            const hasLiveDemo = Boolean(projet.link);
            const hasImage = Boolean(projet.image) && !imageErrors[projet.id];

            return (
              <Slide key={projet.id} className="slide" data-index={index}>
                <TitleParallaxOutline className="title-parallax">
                  {projet.title.split(' ').slice(0, 3).join(' ')}
                </TitleParallaxOutline>

                <ImageWrapper
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                >
                  <BrowserBar>
                    <Dot $color="#ff5f56" />
                    <Dot $color="#ffbd2e" />
                    <Dot $color="#27c93f" />
                    <BrowserAddressBar>
                      {hasLiveDemo ? projet.link : `project://0${index + 1}-${projet.category.toLowerCase().replace(/\s+/g, '-')}`}
                    </BrowserAddressBar>
                  </BrowserBar>

                  <ImageInnerContainer>
                    {hasImage ? (
                      <ProjectImageWrapper className="parallax-bg">
                        <Image
                          src={projet.image}
                          alt={`Screenshot of ${projet.title}`}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 80vw, 45vw"
                          style={{ objectFit: 'cover', objectPosition: 'top' }}
                          priority={index === 0}
                          onError={() => setImageErrors(prev => ({ ...prev, [projet.id]: true }))}
                        />
                      </ProjectImageWrapper>
                    ) : (
                      <VisualGraphicWrapper $color={projet.color} className="parallax-bg">
                        <IconBackdrop $color={projet.color}>
                          <IconComp />
                        </IconBackdrop>
                      </VisualGraphicWrapper>
                    )}

                    <GradientOverlay />

                    <ProjectInfo>
                      <ProjectRole>
                        <RoleIndex>0{index + 1}</RoleIndex> {projet.category}
                      </ProjectRole>

                      <ProjectTitleText>{projet.title}</ProjectTitleText>

                      <ProjectDescText>{projet.description}</ProjectDescText>

                      <TechTagsRow>
                        {projet.tech.map((t) => (
                          <TechTagItem key={t}>{t}</TechTagItem>
                        ))}
                      </TechTagsRow>

                      {(hasLiveDemo || Boolean(projet.github)) && (
                        <ActionButtonsRow>
                          {hasLiveDemo && (
                            <ActionBtn href={projet.link} target="_blank" rel="noopener noreferrer">
                              <FiExternalLink /> Live Demo
                            </ActionBtn>
                          )}
                          {Boolean(projet.github) && (
                            <ActionBtn
                              href={projet.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
                            >
                              <FiGithub /> Source Code
                            </ActionBtn>
                          )}
                        </ActionButtonsRow>
                      )}
                    </ProjectInfo>
                  </ImageInnerContainer>
                </ImageWrapper>

                <TitleParallaxSolid className="title-parallax">
                  {projet.title.split(' ').slice(0, 3).join(' ')}
                </TitleParallaxSolid>
              </Slide>
            );
          })}
        </ScrollContainer>
      </StickyContainer>
    </ProjectsSection>
  );
}
