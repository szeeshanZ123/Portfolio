'use client';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { achievements } from '@/data/achievements';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateY(-4px);
    box-shadow: 0 12px 30px ${({ theme }) => theme.colors.shadow};
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

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
`;

export default function Achievements() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="achievements"
      label={t('achievements.label')}
      title={t('achievements.title')}
      description={t('achievements.description')}
    >
      <Grid>
        {achievements.map((item) => (
          <Card key={item.id}>
            <IconHeader>
              <IconBox $color={item.color}>{item.icon}</IconBox>
              <div>
                <CategoryLabel $color={item.color}>{item.category}</CategoryLabel>
                <CardTitle>{item.title}</CardTitle>
              </div>
            </IconHeader>
            <Description>{item.description}</Description>
          </Card>
        ))}
      </Grid>
    </SectionWrapper>
  );
}
