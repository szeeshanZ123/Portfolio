'use client';
import { useState } from 'react';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { certifications, certificationCategories } from '@/data/certifications';
import { FiAward, FiEye, FiX, FiCheck, FiLayers } from 'react-icons/fi';

const IntroText = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  line-height: 1.7;
  margin: 0 0 2.5rem 0;
`;

const FilterTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`;

const TabButton = styled.button`
  padding: 0.6rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $active }) => $active ? theme.colors.accentGlow : theme.colors.glass};
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
`;

const CertCard = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.75rem;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $color, theme }) => $color || theme.colors.gradient};
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateY(-4px);
    box-shadow: 0 16px 36px ${({ theme }) => theme.colors.shadow};

    &::before {
      opacity: 1;
    }
  }
`;

const IssuerBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ $color, theme }) => $color || theme.colors.accent};
  background: ${({ $color }) => `${$color}15`};
  border: 1px solid ${({ $color }) => `${$color}30`};
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-bottom: 1rem;
  width: fit-content;
`;

const CertTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem 0;
  line-height: 1.4;
  flex-grow: 1;
`;

const CategoryTag = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const TopicList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
`;

const TopicPill = styled.span`
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ViewBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.65rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: auto;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentGlow};
  }
`;

/* Modal Styles */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  max-width: 650px;
  width: 100%;
  padding: 2rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CertificatePreviewPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: radial-gradient(circle at 50% 40%, rgba(30, 41, 59, 0.8), #0a0a14);
  border: 1px dashed ${({ theme }) => theme.colors.accent}60;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  padding: 1.5rem;

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const PlaceholderText = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function Certifications() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCerts = activeCategory === 'all'
    ? certifications
    : certifications.filter(c => c.category === activeCategory);

  return (
    <SectionWrapper
      id="certifications"
      label={t('certifications.label')}
      title={t('certifications.title')}
    >
      <IntroText>{t('certifications.intro')}</IntroText>

      <FilterTabs>
        {certificationCategories.map((cat) => (
          <TabButton
            key={cat.id}
            $active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </TabButton>
        ))}
      </FilterTabs>

      <CertGrid>
        {filteredCerts.map((cert) => (
          <CertCard key={cert.id} $color={cert.badgeColor}>
            <IssuerBadge $color={cert.badgeColor}>
              <FiAward /> {cert.issuer}
            </IssuerBadge>

            <CertTitle>{cert.title}</CertTitle>

            <CategoryTag>
              <FiLayers /> {cert.categoryLabel}
            </CategoryTag>

            <TopicList>
              {cert.topics.map((topic) => (
                <TopicPill key={topic}>{topic}</TopicPill>
              ))}
            </TopicList>

            <ViewBtn onClick={() => setSelectedCert(cert)}>
              <FiEye /> {t('certifications.viewCertificate')}
            </ViewBtn>
          </CertCard>
        ))}
      </CertGrid>

      {/* Lightbox / Modal */}
      {selectedCert && (
        <ModalOverlay onClick={() => setSelectedCert(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedCert(null)} aria-label="Close">
              <FiX size={18} />
            </CloseBtn>

            <IssuerBadge $color={selectedCert.badgeColor}>
              <FiAward /> {selectedCert.issuer}
            </IssuerBadge>

            <CertTitle style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              {selectedCert.title}
            </CertTitle>

            <CategoryTag style={{ marginBottom: '1.25rem' }}>
              <FiLayers /> {selectedCert.categoryLabel}
            </CategoryTag>

            <CertificatePreviewPlaceholder>
              <FiAward />
              <PlaceholderText>
                Official Credential Image
                <br />
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>[ADD IMAGE / CERTIFICATE PREVIEW]</span>
              </PlaceholderText>
            </CertificatePreviewPlaceholder>

            <TopicList>
              {selectedCert.topics.map((topic) => (
                <TopicPill key={topic}>✓ {topic}</TopicPill>
              ))}
            </TopicList>
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionWrapper>
  );
}
