'use client';
import styled from 'styled-components';

const SvgIcon = styled.svg`
  width: ${({ $width }) => $width || '40px'};
  height: auto;
  transition: transform 0.3s ease;
  
  .logo-stroke {
    stroke: ${({ theme, $color }) => $color || theme.colors.accent};
    transition: stroke 0.3s ease;
  }
  .logo-fill {
    fill: ${({ theme, $color }) => $color || theme.colors.text};
    transition: fill 0.3s ease;
  }
`;

export default function Logo({ width, className, color }) {
    return (
        <SvgIcon
            className={className}
            $width={width}
            $color={color}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Hexagonal Tech Node Frame */}
            <path
                className="logo-stroke"
                d="M50 8 L86 29 L86 71 L50 92 L14 71 L14 29 Z"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
            />
            {/* Elegant ZS Geometry */}
            {/* Top Bar for Z */}
            <path
                className="logo-stroke"
                d="M32 34 L68 34 L36 66 L72 66"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Connected analytical dot */}
            <circle cx="50" cy="50" r="3.5" className="logo-fill" fill="#10B981" />
        </SvgIcon>
    );
}
