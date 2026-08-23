'use client';
import styled from 'styled-components';
import SectionWrapper from '@/components/SectionWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { experiences, leadershipExperiences } from '@/data/experience';
import { FiBriefcase, FiCalendar, FiMapPin, FiAward, FiCheckCircle } from 'react-icons/fi';

const ExperienceLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const SectionSubheading = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    bottom: 1.5rem;
    left: 2rem;
    width: 2px;
    background: ${({ theme }) => `linear-gradient(to bottom, ${theme.colors.accent}, ${theme.colors.border})`};
    
    @media (max-width: 768px) {
      left: 1rem;
    }
  }
`;

const ExperienceCard = styled.div`
  position: relative;
  margin-left: 4.5rem;
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  backdrop-filter: blur(16px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 2.75rem;
    padding: 1.5rem;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    transform: translateX(6px);
    box-shadow: 0 12px 36px ${({ theme }) => theme.colors.shadow};
  }
`;

const TimelineNode = styled.div`
  position: absolute;
  left: -3.65rem;
  top: 2rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ $color, theme }) => $color || theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color, theme }) => $color || theme.colors.accent};
  font-size: 1rem;
  box-shadow: 0 0 15px ${({ $color, theme }) => `${$color || theme.colors.accent}40`};

  @media (max-width: 768px) {
    left: -2.35rem;
    width: 1.75rem;
    height: 1.75rem;
    font-size: 0.8rem;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RoleTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.35rem 0;
`;

const CompanyName = styled.div`
  font-size: 1rem;
  color: ${({ $color, theme }) => $color || theme.colors.accent};
  font-weight: 600;
`;

const MetaTags = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`;

const ResponsibilitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.25rem 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ResponsibilityItem = styled.li`
  font-size: 0.92rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg {
    flex-shrink: 0;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1rem;
  }
`;

const TechBadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechBadge = styled.span`
  padding: 0.3rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.78rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

export default function Experience() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="experience"
      label={t('experience.label')}
      title={t('experience.title')}
      description={t('experience.description')}
    >
      <ExperienceLayout>
        {/* Industry Work Experience */}
        <div>
          <Timeline>
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id}>
                <TimelineNode $color={exp.color}>
                  <FiBriefcase />
                </TimelineNode>
                <CardHeader>
                  <div>
                    <RoleTitle>{exp.role}</RoleTitle>
                    <CompanyName $color={exp.color}>{exp.company}</CompanyName>
                  </div>
                  <MetaTags>
                    <MetaItem>
                      <FiCalendar /> {exp.period}
                    </MetaItem>
                    <MetaItem>
                      <FiMapPin /> {exp.location} ({exp.workType})
                    </MetaItem>
                  </MetaTags>
                </CardHeader>
                <ResponsibilitiesList>
                  {exp.responsibilities.map((resp, idx) => (
                    <ResponsibilityItem key={idx}>
                      <FiCheckCircle />
                      <span>{resp}</span>
                    </ResponsibilityItem>
                  ))}
                </ResponsibilitiesList>
                <TechBadgeGroup>
                  {exp.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </TechBadgeGroup>
              </ExperienceCard>
            ))}
          </Timeline>
        </div>

        {/* Leadership Experience */}
        <div>
          <SectionSubheading>
            <FiAward />
            {t('experience.leadershipTitle')}
          </SectionSubheading>
          <Timeline>
            {leadershipExperiences.map((lead) => (
              <ExperienceCard key={lead.id}>
                <TimelineNode $color={lead.color}>
                  <FiAward />
                </TimelineNode>
                <CardHeader>
                  <div>
                    <RoleTitle>{lead.role}</RoleTitle>
                    <CompanyName $color={lead.color}>{lead.organization}</CompanyName>
                  </div>
                  <MetaTags>
                    <MetaItem>
                      <FiCalendar /> {lead.period}
                    </MetaItem>
                  </MetaTags>
                </CardHeader>
                <ResponsibilitiesList>
                  {lead.responsibilities.map((resp, idx) => (
                    <ResponsibilityItem key={idx}>
                      <FiCheckCircle />
                      <span>{resp}</span>
                    </ResponsibilityItem>
                  ))}
                </ResponsibilitiesList>
                <TechBadgeGroup>
                  {lead.technologies.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </TechBadgeGroup>
              </ExperienceCard>
            ))}
          </Timeline>
        </div>
      </ExperienceLayout>
    </SectionWrapper>
  );
}
