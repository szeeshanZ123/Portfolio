'use client';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { skillCategories } from '@/data/skills';
import {
  FiDatabase, FiCode, FiLayers, FiCpu, FiTrendingUp,
  FiTerminal, FiCheckCircle, FiServer, FiTool
} from 'react-icons/fi';

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const BentoCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  grid-column: span 12;

  ${({ $cols }) => $cols === 7 && `
    @media (min-width: 768px) { grid-column: span 7; }
  `}
  ${({ $cols }) => $cols === 5 && `
    @media (min-width: 768px) { grid-column: span 5; }
  `}
  ${({ $cols }) => $cols === 6 && `
    @media (min-width: 768px) { grid-column: span 6; }
  `}
  ${({ $cols }) => $cols === 4 && `
    @media (min-width: 768px) { grid-column: span 4; }
  `}

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateY(-4px);
    box-shadow: 0 16px 40px -10px ${({ theme }) => theme.colors.shadowLg};
  }
`;

const Spotlight = styled.div`
  pointer-events: none;
  position: absolute;
  inset: -1px;
  border-radius: ${({ theme }) => theme.radii.xl};
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    600px circle at ${({ $x }) => $x}px ${({ $y }) => $y}px, 
    ${({ theme }) => theme.colors.accent}22,
    transparent 40%
  );

  ${BentoCardWrapper}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const IconWrapper = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.gradientSubtle};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.5rem;
  transition: transform 0.4s ease;

  ${BentoCardWrapper}:hover & {
    transform: scale(1.08) rotate(3deg);
  }
`;

const TitleBlock = styled.div`
  flex: 1;
`;

const CardCategory = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
  display: block;
  margin-bottom: 0.2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CardDesc = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.75rem;
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
`;

const TechPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.82rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.25s ease;

  svg {
    font-size: 0.95rem;
    color: ${({ $color, theme }) => $color || theme.colors.accent};
  }

  &:hover {
    border-color: ${({ $color, theme }) => $color || theme.colors.accent};
    background: ${({ $color }) => `${$color}15`};
    transform: translateY(-2px);
  }
`;

const BentoCard = ({ children, cols }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <BentoCardWrapper
      ref={cardRef}
      onMouseMove={handleMouseMove}
      $cols={cols}
    >
      <Spotlight $x={mousePosition.x} $y={mousePosition.y} />
      <CardContent>
        {children}
      </CardContent>
    </BentoCardWrapper>
  );
};

export default function Skills() {
  const { t } = useLanguage();

  const progData = skillCategories.find(c => c.id === 'programming-data');
  const analyticsData = skillCategories.find(c => c.id === 'data-analytics-bi');
  const mlData = skillCategories.find(c => c.id === 'machine-learning');
  const dbData = skillCategories.find(c => c.id === 'database');
  const devData = skillCategories.find(c => c.id === 'development-tools');

  return (
    <SectionWrapper
      id="skills"
      label={t('skills.label')}
      title={t('skills.title')}
      description={t('skills.description')}
    >
      <BentoGrid>
        {/* 1. Programming & Data (Span 7) */}
        {progData && (
          <BentoCard cols={7}>
            <HeaderRow>
              <IconWrapper>{progData.icon}</IconWrapper>
              <TitleBlock>
                <CardCategory>Core Foundations</CardCategory>
                <CardTitle>{progData.title}</CardTitle>
              </TitleBlock>
            </HeaderRow>
            <CardDesc>{progData.description}</CardDesc>
            <TechGrid>
              {progData.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <TechPill key={skill.name} $color={skill.color}>
                    {IconComponent && <IconComponent />}
                    <span>{skill.name}</span>
                  </TechPill>
                );
              })}
            </TechGrid>
          </BentoCard>
        )}

        {/* 2. Machine Learning (Span 5) */}
        {mlData && (
          <BentoCard cols={5}>
            <HeaderRow>
              <IconWrapper>{mlData.icon}</IconWrapper>
              <TitleBlock>
                <CardCategory>Statistical AI</CardCategory>
                <CardTitle>{mlData.title}</CardTitle>
              </TitleBlock>
            </HeaderRow>
            <CardDesc>{mlData.description}</CardDesc>
            <TechGrid>
              {mlData.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <TechPill key={skill.name} $color={skill.color}>
                    {IconComponent && <IconComponent />}
                    <span>{skill.name}</span>
                  </TechPill>
                );
              })}
            </TechGrid>
          </BentoCard>
        )}

        {/* 3. Data Analytics & BI (Span 12) */}
        {analyticsData && (
          <BentoCard cols={12}>
            <HeaderRow>
              <IconWrapper>{analyticsData.icon}</IconWrapper>
              <TitleBlock>
                <CardCategory>Business Intelligence & Dashboards</CardCategory>
                <CardTitle>{analyticsData.title}</CardTitle>
              </TitleBlock>
            </HeaderRow>
            <CardDesc>{analyticsData.description}</CardDesc>
            <TechGrid>
              {analyticsData.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <TechPill key={skill.name} $color={skill.color}>
                    {IconComponent && <IconComponent />}
                    <span>{skill.name}</span>
                  </TechPill>
                );
              })}
            </TechGrid>
          </BentoCard>
        )}

        {/* 4. Database Management (Span 6) */}
        {dbData && (
          <BentoCard cols={6}>
            <HeaderRow>
              <IconWrapper>{dbData.icon}</IconWrapper>
              <TitleBlock>
                <CardCategory>Relational Architecture</CardCategory>
                <CardTitle>{dbData.title}</CardTitle>
              </TitleBlock>
            </HeaderRow>
            <CardDesc>{dbData.description}</CardDesc>
            <TechGrid>
              {dbData.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <TechPill key={skill.name} $color={skill.color}>
                    {IconComponent && <IconComponent />}
                    <span>{skill.name}</span>
                  </TechPill>
                );
              })}
            </TechGrid>
          </BentoCard>
        )}

        {/* 5. Development & Tools (Span 6) */}
        {devData && (
          <BentoCard cols={6}>
            <HeaderRow>
              <IconWrapper>{devData.icon}</IconWrapper>
              <TitleBlock>
                <CardCategory>Frameworks & Tooling</CardCategory>
                <CardTitle>{devData.title}</CardTitle>
              </TitleBlock>
            </HeaderRow>
            <CardDesc>{devData.description}</CardDesc>
            <TechGrid>
              {devData.skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <TechPill key={skill.name} $color={skill.color}>
                    {IconComponent && <IconComponent />}
                    <span>{skill.name}</span>
                  </TechPill>
                );
              })}
            </TechGrid>
          </BentoCard>
        )}
      </BentoGrid>
    </SectionWrapper>
  );
}
