'use client';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowUp, FiMail } from 'react-icons/fi';
import LogoIcon from '@/components/Logo';
import MagneticButton from '@/components/MagneticButton';

const ticker = keyframes`from { transform: translateX(0); } to { transform: translateX(-50%); }`;
const pulse = keyframes`0%,100%{transform:scale(1);opacity:1}50%{transform:scale(0.9);opacity:0.5}`;
const gradientShift = keyframes`
  0%,100%{background-position:0% 50%}
  50%{background-position:100% 50%}
`;

const FooterSection = styled.footer`
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const CtaArea = styled.div`
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 5rem;
  text-align: center;
  background: ${({ theme }) => `linear-gradient(180deg, transparent 0%, ${theme.colors.accent}08 60%, ${theme.colors.accent}12 100%)`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const BigBlob = styled.div`
  position: absolute;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  filter: blur(160px);
  opacity: 0.06;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  pointer-events: none;
`;

const CtaEyebrow = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.5rem;
  padding: 5px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.accent}40;
  background: ${({ theme }) => theme.colors.accent}0D;
`;

const PulseDot = styled.span`
  width: 6px; height: 6px; border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  animation: ${pulse} 2s ease-in-out infinite;
`;

const CtaTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
`;

const CtaLine1 = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const CtaLine2 = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  background-size: 200% 200%;
  animation: ${gradientShift} 4s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CtaSub = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 500px; margin: 0 auto 2.5rem;
  line-height: 1.75;
`;

const CtaButtons = styled.div`
  display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;
`;

const CtaBtn = styled.a`
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.85rem 2.2rem; border-radius: 999px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.gradient};
  background-size: 200% 200%; animation: ${gradientShift} 4s ease infinite;
  color: #fff;
  text-decoration: none;
  &:hover { transform: translateY(-3px); box-shadow: 0 14px 40px ${({ theme }) => theme.colors.accentGlow}; }
`;

const CtaBtnOutline = styled.a`
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.85rem 2.2rem; border-radius: 999px;
  font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.glass}; backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const TickerBar = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  background-size: 200% 200%;
  animation: ${gradientShift} 6s ease infinite;
  padding: 1rem 0; overflow: hidden;
`;

const TickerTrack = styled.div`
  display: flex; gap: 3rem; width: max-content;
  animation: ${ticker} 22s linear infinite;
`;

const TickerText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(0.9rem, 2vw, 1.25rem);
  font-weight: 700; white-space: nowrap;
  color: rgba(255,255,255,0.95);
`;

const FooterBody = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterInner = styled.div`
  max-width: 1280px; margin: 0 auto; padding: 4rem 2rem 0;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr;
  gap: 3rem;
  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const BrandCol = styled.div``;

const BrandRow = styled.div`
  display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem; font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const BrandDesc = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8; max-width: 320px; margin-bottom: 1.75rem;
`;

const FooterSocials = styled.div`display: flex; gap: 0.65rem; flex-wrap: wrap;`;

const SocialBtn = styled.a`
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.25s ease; cursor: pointer;
  background: ${({ theme }) => theme.colors.bgSecondary};
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const ColTitle = styled.h4`
  font-size: 0.8rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const ColLink = styled.a`
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.7rem; cursor: pointer; transition: all 0.25s ease;
  text-decoration: none;
  &::before {
    content: ''; width: 0; height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.25s ease; border-radius: 2px;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    &::before { width: 10px; }
  }
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px; padding: 1.5rem;
  height: fit-content;
`;

const StatusTitle = styled.div`
  font-size: 0.8rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const StatusBadge = styled.div`
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.8rem; color: #10b981;
  margin-bottom: 1rem;
`;

const GreenDot = styled.span`
  width: 7px; height: 7px; border-radius: 50%; background: #10b981;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const EmailRow = styled.div`
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.78rem; color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  margin-bottom: 1rem;
  word-break: break-all;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const StatusBtn = styled.a`
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.4rem;
  padding: 0.65rem; border-radius: 10px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
  background: ${({ theme }) => theme.colors.gradient};
  background-size: 200% 200%; animation: ${gradientShift} 5s ease infinite;
  color: #fff; transition: all 0.3s ease;
  text-decoration: none;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${({ theme }) => theme.colors.accentGlow}; }
`;

const BottomBar = styled.div`
  max-width: 1280px; margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 3rem;
  @media (max-width: 600px) { flex-direction: column; gap: 1rem; text-align: center; }
`;

const Copyright = styled.p`
  font-size: 0.82rem; color: ${({ theme }) => theme.colors.textMuted};
  display: flex; align-items: center; gap: 0.3rem;
  span { color: ${({ theme }) => theme.colors.accent}; }
`;

const BackToTop = styled.button`
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-size: 0.82rem; color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer; transition: all 0.3s ease; padding: 0.45rem 1rem;
  border-radius: 999px; border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgSecondary};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Activities' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const tickerItems = [
    'Data Analyst', '✦',
    'Aspiring Data Scientist', '✦',
    'Python Developer', '✦',
    'Power BI & DAX', '✦',
    'SQL & Relational DBs', '✦',
    'Machine Learning', '✦',
    'Open for Opportunities', '✦'
  ];

  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FooterSection>
      <CtaArea>
        <BigBlob />
        <CtaEyebrow><PulseDot /> {t('contact.availableStatus')}</CtaEyebrow>
        <CtaTitle>
          <CtaLine1>{t('footer.ctaLine1')}</CtaLine1>
          <CtaLine2>{t('footer.ctaLine2')}</CtaLine2>
        </CtaTitle>
        <CtaSub>{t('footer.ctaSub')}</CtaSub>
        <CtaButtons>
          <MagneticButton>
            <CtaBtn href="#contact" onClick={e => { e.preventDefault(); handleClick('contact'); }}>
              <FiMail /> {t('nav.letsTalk')}
            </CtaBtn>
          </MagneticButton>
          <MagneticButton>
            <CtaBtnOutline href="https://github.com/szeeshanZ123" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </CtaBtnOutline>
          </MagneticButton>
        </CtaButtons>
      </CtaArea>

      <TickerBar>
        <TickerTrack>
          {[...tickerItems, ...tickerItems].map((text, i) => (
            <TickerText key={i}>{text}</TickerText>
          ))}
        </TickerTrack>
      </TickerBar>

      <FooterBody>
        <FooterInner>
          {/* Brand */}
          <BrandCol>
            <BrandRow>
              <LogoIcon width="36px" />
              <BrandName>{t('footer.brand')}</BrandName>
            </BrandRow>
            <BrandDesc>{t('footer.brandDesc')}</BrandDesc>
            <FooterSocials>
              <SocialBtn href="https://github.com/szeeshanZ123" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></SocialBtn>
              <SocialBtn href="https://www.linkedin.com/in/zeeshan-shaikh-6b3a753a1" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedinIn /></SocialBtn>
            </FooterSocials>
          </BrandCol>

          {/* Quick links */}
          <div>
            <ColTitle>{t('footer.quickLinks')}</ColTitle>
            {navLinks.map(link => (
              <ColLink key={link.id} onClick={(e) => { e.preventDefault(); handleClick(link.id); }}>
                {link.label}
              </ColLink>
            ))}
          </div>

          {/* Focus Areas */}
          <div>
            <ColTitle>{t('footer.focusAreas')}</ColTitle>
            <ColLink>{t('footer.dataAnalytics')}</ColLink>
            <ColLink>{t('footer.machineLearning')}</ColLink>
            <ColLink>{t('footer.pythonDev')}</ColLink>
            <ColLink>{t('footer.sqlDb')}</ColLink>
          </div>

          {/* Status card */}
          <StatusCard>
            <StatusTitle>{t('footer.statusTitle')}</StatusTitle>
            <StatusBadge><GreenDot /> {t('contact.availableStatus')}</StatusBadge>
            <EmailRow><FiMail size={12} /> shaikhzeeshan7554@gmail.com</EmailRow>
            <StatusBtn href="#contact" onClick={e => { e.preventDefault(); handleClick('contact'); }}>
              {t('nav.letsTalk')} →
            </StatusBtn>
          </StatusCard>
        </FooterInner>

        <BottomBar>
          <Copyright>
            © {year} Zeeshan Shaikh. All rights reserved.
          </Copyright>
          <BackToTop onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('footer.backToTop')} <FiArrowUp />
          </BackToTop>
        </BottomBar>
      </FooterBody>
    </FooterSection>
  );
}
