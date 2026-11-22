'use client';
import { useState } from 'react';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { achievements } from '@/data/achievements';
import { FiAward, FiEye, FiX, FiCheck } from 'react-icons/fi';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
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
    box-shadow: 0 12px 30px ${({ theme }) => theme.colors.shadow};

    &::before {
      opacity: 1;
    }
  }
`;

const IconHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const IconBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $color }) => `${$color}15`};
  border: 1px solid ${({ $color }) => `${$color}35`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const CategoryLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ $color, theme }) => $color || theme.colors.accent};
  display: block;
`;

const CardTitle = styled.h4`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0.2rem 0 0 0;
`;

const RoleTag = styled.div`
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentGlow};
  border: 1px solid ${({ theme }) => theme.colors.accent}30;
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.full};
  margin-bottom: 1rem;
  width: fit-content;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
  flex-grow: 1;
`;

const CertificateBtn = styled.button`
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

/* Lightbox Modal */
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

const CertificateImageContainer = styled.div`
  width: 100%;
  max-height: 460px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    max-height: 460px;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

export default function Achievements() {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <SectionWrapper
      id="achievements"
      label={t('achievements.label')}
      title={t('achievements.title')}
      description={t('achievements.description')}
    >
      <Grid>
        {achievements.map((item) => (
          <Card key={item.id} $color={item.color}>
            <IconHeader>
              <IconBox $color={item.color}>{item.icon}</IconBox>
              <div>
                <CategoryLabel $color={item.color}>{item.category}</CategoryLabel>
                <CardTitle>{item.title}</CardTitle>
              </div>
            </IconHeader>

            {item.role && <RoleTag>{item.role}</RoleTag>}

            <Description>{item.description}</Description>

            {item.image && (
              <CertificateBtn onClick={() => setSelectedItem(item)}>
                <FiEye /> View Certificate
              </CertificateBtn>
            )}
          </Card>
        ))}
      </Grid>

      {/* Lightbox Modal */}
      {selectedItem && (
        <ModalOverlay onClick={() => setSelectedItem(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedItem(null)} aria-label="Close">
              <FiX size={18} />
            </CloseBtn>

            <CategoryLabel $color={selectedItem.color} style={{ marginBottom: '0.4rem' }}>
              {selectedItem.category}
            </CategoryLabel>

            <CardTitle style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              {selectedItem.title}
            </CardTitle>

            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: 0 }}>
              {selectedItem.organization} {selectedItem.date ? `• ${selectedItem.date}` : ''}
            </p>

            <CertificateImageContainer>
              <img src={selectedItem.image} alt={selectedItem.title} />
            </CertificateImageContainer>

            <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#cbd5e1', margin: 0 }}>
              {selectedItem.description}
            </p>
          </ModalContent>
        </ModalOverlay>
      )}
    </SectionWrapper>
  );
}
