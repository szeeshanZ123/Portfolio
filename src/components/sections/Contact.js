'use client';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiCheck, FiCopy } from 'react-icons/fi';

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
`;

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.accent}08 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.accent}08 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
`;

const orbDrift = keyframes`
  from { transform: translate(0, 0); }
  to { transform: translate(30px, 20px); }
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
  animation: ${orbDrift} 12s ease-in-out infinite alternate;
`;

const Orb1 = styled(Orb)`
  width: 500px; height: 500px; background: rgba(16,185,129,0.12); top: -100px; right: -100px;
`;
const Orb2 = styled(Orb)`
  width: 400px; height: 400px; background: rgba(14,165,233,0.08); bottom: -80px; left: -80px; animation-delay: -6s;
`;
const Orb3 = styled(Orb)`
  width: 300px; height: 300px; background: rgba(99,102,241,0.06); top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: -3s;
`;

const ContactSection = styled.section`
  position: relative;
  overflow-y: visible;
  overflow-x: clip;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const ContactContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 40px;
  @media (max-width: 768px) { padding: 60px 20px; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SectionEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease forwards;
`;
const EyebrowLine = styled.div`
  width: 32px; height: 1px;
  background: ${({ theme }) => theme.colors.accentLight || '#10b981'};
`;
const EyebrowText = styled.span`
  font-family: ${({ theme }) => theme.fonts?.mono || "'JetBrains Mono', monospace"};
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accentLight || '#10b981'};
`;

const SectionTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts?.heading || "'Space Grotesk', sans-serif"};
  font-size: clamp(48px, 7vw, 84px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease 0.1s forwards;
`;

const TitleLine1 = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const TitleLine2 = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 50px;
  letter-spacing: 0.02em;
  opacity: 0;
  animation: ${fadeUp} 0.6s ease 0.2s forwards;
  max-width: 550px;
  line-height: 1.6;
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  align-items: start;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  opacity: 0;
  animation: ${fadeUp} 0.6s ease 0.3s forwards;
`;

const pulseGreen = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
  50% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
`;

const StatusBadge = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2);
  border-radius: 999px; padding: 6px 14px; font-size: 11px;
  letter-spacing: 0.08em; color: #10b981; margin-bottom: 32px;
  font-family: ${({ theme }) => theme.fonts.mono};
`;
const StatusDot = styled.div`
  width: 6px; height: 6px; border-radius: 50%; background: #10b981;
  animation: ${pulseGreen} 2s ease-in-out infinite;
`;

const ContactInfoCards = styled.div`
  display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px;
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px; padding: 18px 20px; display: flex; align-items: center; gap: 16px;
  cursor: pointer; transition: all 0.25s ease; position: relative; overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent, ${({ theme }) => theme.colors.accent}15);
    opacity: 0; transition: opacity 0.25s;
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateX(4px);
    &::before { opacity: 1; }
  }
`;

const InfoCardIcon = styled.div`
  width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 18px;
  background: ${({ $color }) => `${$color}20`};
  color: ${({ $color }) => $color};
`;

const InfoCardContent = styled.div`flex: 1;`;

const InfoCardLabel = styled.div`
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: ${({ theme }) => theme.colors.textMuted}; margin-bottom: 3px;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const InfoCardValue = styled.div`
  font-size: 14px; color: ${({ theme }) => theme.colors.text}; font-weight: 500;
  display: flex; align-items: center; gap: 8px;
`;

const CopyHint = styled.span`
  font-size: 10px; color: ${({ theme }) => theme.colors.textMuted}; opacity: 0; transition: opacity 0.2s;
  ${InfoCard}:hover & { opacity: 1; }
`;

const SocialsLabel = styled.div`
  font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: ${({ theme }) => theme.colors.textMuted}; margin-bottom: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const SocialsRow = styled.div`
  display: flex; gap: 12px; flex-wrap: wrap;
`;

const SocialBtn = styled.a`
  width: 44px; height: 44px; border-radius: 12px; background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.25s ease; text-decoration: none; color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 18px; position: relative; overflow: hidden;
  backdrop-filter: blur(10px);

  &:hover {
    color: #ffffff; border-color: ${({ theme }) => theme.colors.accent}; transform: translateY(-3px);
    background: ${({ theme }) => theme.colors.gradient};
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const FormPanel = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  backdrop-filter: blur(16px);
  border-radius: 24px; padding: 36px; position: relative; overflow: hidden;
  opacity: 0; animation: ${fadeUp} 0.6s ease 0.4s forwards;
  
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0.8;
  }
  @media (max-width: 480px) { padding: 24px; }
`;

const FormHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
`;
const FormTitle = styled.div`
  font-size: 1.25rem; font-weight: 700; color: ${({ theme }) => theme.colors.text};
`;
const FormCounter = styled.div`
  font-size: 11px; color: ${({ theme }) => theme.colors.textMuted}; font-family: ${({ theme }) => theme.fonts.mono};
`;

const ChipsRow = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;
`;

const Chip = styled.button`
  padding: 6px 14px; border-radius: 999px; border: 1px solid ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.border};
  font-size: 11px; font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.textMuted};
  background: ${({ theme, $active }) => $active ? theme.colors.accentGlow : 'transparent'};
  cursor: pointer; transition: all 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.accent};
  }
`;

const FormGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;
const FieldGroup = styled.div`
  display: flex; flex-direction: column; gap: 6px;
  ${({ $full }) => $full && 'grid-column: 1 / -1;'}
`;
const FieldLabel = styled.label`
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
`;
const FieldInput = styled.input`
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'}; 
  border: 1px solid ${({ $error, theme }) => $error ? '#ef4444' : theme.colors.border};
  border-radius: 12px; padding: 14px 16px; font-family: inherit; font-size: 13px; color: ${({ theme }) => theme.colors.text};
  outline: none; transition: all 0.2s ease; width: 100%;
  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; opacity: 0.6; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }
`;
const FieldTextarea = styled.textarea`
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'}; 
  border: 1px solid ${({ $error, theme }) => $error ? '#ef4444' : theme.colors.border};
  border-radius: 12px; padding: 14px 16px; font-family: inherit; font-size: 13px; color: ${({ theme }) => theme.colors.text};
  outline: none; transition: all 0.2s ease; width: 100%; resize: vertical; min-height: 120px;
  &::placeholder { color: ${({ theme }) => theme.colors.textMuted}; opacity: 0.6; }
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const CharCount = styled.div`
  font-size: 10px; color: ${({ theme }) => theme.colors.textMuted};
  text-align: right; margin-top: 4px; font-family: ${({ theme }) => theme.fonts.mono};
`;

const SubmitBtn = styled.button`
  width: 100%; padding: 16px; border-radius: 14px; border: none; cursor: pointer;
  font-size: 15px; font-weight: 700; letter-spacing: 0.04em; color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: ${({ theme }) => theme.colors.gradient};
  &:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.accentGlow};
  }
  &:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
`;

const FormFooter = styled.div`
  display: flex; align-items: center; justify-content: space-between; margin-top: 16px;
`;
const FormFootnote = styled.div`
  font-size: 10px; color: ${({ theme }) => theme.colors.textMuted};
`;

const SuccessOverlay = styled.div`
  position: absolute; inset: 0; background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 16px; opacity: ${({ $show }) => $show ? 1 : 0}; pointer-events: ${({ $show }) => $show ? 'all' : 'none'};
  transition: opacity 0.4s ease; z-index: 10;
`;
const SuccessIcon = styled.div`
  width: 64px; height: 64px; border-radius: 50%; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3);
  display: flex; align-items: center; justify-content: center; font-size: 28px; color: #10b981;
`;
const SuccessTitle = styled.div`
  font-size: 22px; font-weight: 800; color: ${({ theme }) => theme.colors.text};
`;
const SuccessSub = styled.div`
  font-size: 13px; color: ${({ theme }) => theme.colors.textMuted}; text-align: center; max-width: 280px; line-height: 1.6;
`;

export default function Contact() {
  const { t } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [copiedField, setCopiedField] = useState(null);

  let step = 1;
  if (selectedChip) step = 2;
  if (name && email) step = 3;

  const topics = [
    'Data Analytics Project',
    'Job Opportunity / Internship',
    'Collaboration',
    'General Inquiry 👋'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 1500);
      return;
    }
    
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '064484a3-1670-4390-b936-7dc073f91886',
          name: name.trim(),
          email: email.trim(),
          topic: selectedChip || 'General Inquiry',
          message: message.trim(),
          from_name: `${name.trim()} (via Portfolio)`,
          subject: `New Portfolio Inquiry from ${name.trim()} [${selectedChip || 'General Inquiry'}]`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setName('');
          setEmail('');
          setMessage('');
          setSelectedChip(null);
        }, 5000);
      } else {
        setStatus('idle');
        alert('Could not send message automatically. Please contact directly at shaikhzeeshan7554@gmail.com');
      }
    } catch (err) {
      setStatus('idle');
      alert('Could not send message automatically. Please contact directly at shaikhzeeshan7554@gmail.com');
    }
  };

  const copyToClipboard = (text, fieldName) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {
          fallbackCopy(text);
        });
      } else {
        fallbackCopy(text);
      }
    } catch (err) {
      fallbackCopy(text);
    }
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fallbackCopy = (text) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (e) {}
  };

  return (
    <ContactSection id="contact">
      <NoiseOverlay />
      <GridBg />
      <Orb1 />
      <Orb2 />
      <Orb3 />

      <ContactContainer>
        <SectionEyebrow>
          <EyebrowLine />
          <EyebrowText>{t('contact.eyebrow')}</EyebrowText>
        </SectionEyebrow>

        <SectionTitle>
          <TitleLine1>{t('contact.title1')}</TitleLine1>
          <TitleLine2>{t('contact.titleAccent')} {t('contact.title2')}</TitleLine2>
        </SectionTitle>

        <SectionSub>{t('contact.subtitle')}</SectionSub>

        <ContactLayout>
          <LeftPanel>
            <StatusBadge>
              <StatusDot />
              {t('contact.availableStatus')}
            </StatusBadge>

            <ContactInfoCards>
              {/* Email */}
              <InfoCard onClick={() => copyToClipboard('shaikhzeeshan7554@gmail.com', 'email')}>
                <InfoCardIcon $color="#10b981">
                  <FiMail />
                </InfoCardIcon>
                <InfoCardContent>
                  <InfoCardLabel>{t('contact.email')}</InfoCardLabel>
                  <InfoCardValue>
                    {copiedField === 'email' ? (
                      <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiCheck /> {t('contact.copiedSucc')}
                      </span>
                    ) : (
                      <>shaikhzeeshan7554@gmail.com <CopyHint><FiCopy /></CopyHint></>
                    )}
                  </InfoCardValue>
                </InfoCardContent>
              </InfoCard>

              {/* Phone */}
              <InfoCard onClick={() => copyToClipboard('+91 7985064792', 'phone')}>
                <InfoCardIcon $color="#0ea5e9">
                  <FiPhone />
                </InfoCardIcon>
                <InfoCardContent>
                  <InfoCardLabel>{t('contact.phone')}</InfoCardLabel>
                  <InfoCardValue>
                    {copiedField === 'phone' ? (
                      <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiCheck /> {t('contact.copiedSucc')}
                      </span>
                    ) : (
                      <>+91 7985064792 <CopyHint><FiCopy /></CopyHint></>
                    )}
                  </InfoCardValue>
                </InfoCardContent>
              </InfoCard>

              {/* Location */}
              <InfoCard>
                <InfoCardIcon $color="#8b5cf6">
                  <FiMapPin />
                </InfoCardIcon>
                <InfoCardContent>
                  <InfoCardLabel>{t('contact.location')}</InfoCardLabel>
                  <InfoCardValue>Mumbai, India 🇮🇳</InfoCardValue>
                </InfoCardContent>
              </InfoCard>
            </ContactInfoCards>

            <SocialsLabel>{t('contact.findMeOn')}</SocialsLabel>
            <SocialsRow>
              <SocialBtn href="https://github.com/szeeshanZ123" target="_blank" rel="noopener noreferrer" title="GitHub">
                <FaGithub />
              </SocialBtn>
              <SocialBtn href="https://www.linkedin.com/in/zeeshan-shaikh-6b3a753a1" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <FaLinkedinIn />
              </SocialBtn>
            </SocialsRow>
          </LeftPanel>

          <FormPanel>
            <SuccessOverlay $show={status === 'success'}>
              <SuccessIcon>✓</SuccessIcon>
              <SuccessTitle>{t('contact.successTitle')}</SuccessTitle>
              <SuccessSub>{t('contact.successSub')}</SuccessSub>
            </SuccessOverlay>

            <FormHeader>
              <FormTitle>{t('contact.formTitle')}</FormTitle>
              <FormCounter>
                {t('contact.step')} {step} {t('contact.of')} 3
              </FormCounter>
            </FormHeader>

            <ChipsRow>
              {topics.map((topic, i) => (
                <Chip key={i} $active={selectedChip === topic} onClick={() => setSelectedChip(topic)} type="button">
                  {topic}
                </Chip>
              ))}
            </ChipsRow>

            <FormGrid>
              <FieldGroup>
                <FieldLabel>{t('contact.formName')}</FieldLabel>
                <FieldInput 
                  type="text" 
                  placeholder={t('contact.namePlaceholder')}
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  $error={errors.name}
                />
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>{t('contact.formEmail')}</FieldLabel>
                <FieldInput 
                  type="email" 
                  placeholder={t('contact.emailPlaceholder')}
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  $error={errors.email}
                />
              </FieldGroup>
              <FieldGroup $full>
                <FieldLabel>{t('contact.formMessage')}</FieldLabel>
                <FieldTextarea 
                  placeholder={t('contact.msgPlaceholder')}
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  maxLength={500}
                  $error={errors.message}
                />
                <CharCount>{message.length} / 500</CharCount>
              </FieldGroup>
            </FormGrid>

            <SubmitBtn onClick={handleSubmit} disabled={status === 'sending'}>
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </SubmitBtn>

            <FormFooter>
              <FormFootnote>
                {t('contact.footnote')}
              </FormFootnote>
            </FormFooter>
          </FormPanel>
        </ContactLayout>
      </ContactContainer>
    </ContactSection>
  );
}
