import styled, { keyframes, css } from 'styled-components';

export const moveAcross = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(200%); }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 2rem;
  }
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  padding: 0 1rem;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const Scenario = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto 1rem;
  text-align: center;
  position: relative;
  min-height: 400px;
  touch-action: none;
  overflow: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 2rem;
    min-height: 500px;
    margin-bottom: 2rem;
  }

  p {
    font-size: 0.9rem;
    margin: 0.75rem 0;
    padding: 0 0.5rem;
    position: relative;
    z-index: 600;

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 1rem;
      margin: 1rem 0;
    }
  }
`;

export const Track = styled.div`
  height: 8px;
  background-color: #666;
  margin: 1.5rem 0;
  position: relative;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  z-index: 600;

  @media (min-width: ${breakpoints.tablet}) {
    height: 10px;
    margin: 2rem 0;
  }
`;

export const Trolley = styled.div<{ isMoving: boolean }>`
  width: 40px;
  height: 30px;
  background-color: #e74c3c;
  position: absolute;
  left: 0;
  top: -12px;
  border-radius: 5px;
  visibility: ${props => props.isMoving ? 'visible' : 'hidden'};
  animation: ${props => props.isMoving ? moveAcross : 'none'} 2s linear forwards;

  &:before {
    content: '🚂';
    font-size: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 60px;
    height: 40px;
    top: -15px;

    &:before {
      font-size: 24px;
    }
  }
`;

export const DraggableItem = styled.div<{ isDragging: boolean; isActive: boolean }>`
  position: absolute;
  user-select: none;
  -webkit-user-select: none;
  font-size: 20px;
  z-index: ${props => props.isDragging ? 1000 : 600};
  opacity: ${props => props.isDragging ? 0.7 : props.isActive ? 1 : 0.5};
  cursor: ${props => props.isActive ? (props.isDragging ? 'grabbing' : 'grab') : 'not-allowed'};
  transition: ${props => props.isDragging ? 'none' : 'all 0.3s'};
  touch-action: none;
  -webkit-touch-callout: none;
  will-change: transform;
  transform-origin: center center;
  padding: 0.5rem;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }

  &:active {
    cursor: grabbing;
  }

  &:hover {
    transform: ${props => props.isActive && !props.isDragging ? 'scale(1.1)' : 'none'};
  }
`;

export const InteractiveArea = styled.div<{ isActive: boolean }>`
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px dashed ${props => props.isActive ? '#666' : 'transparent'};
  border-radius: 50%;
  transition: all 0.3s;
`;

export const SecretHint = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s;
  max-width: 150px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.5rem;
  border-radius: 3px;

  @media (min-width: ${breakpoints.tablet}) {
    top: 1rem;
    left: 1rem;
    font-size: 0.9rem;
    max-width: 200px;
    padding: 0.5rem 0.75rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
  }
`;

export const Button = styled.button<{ color: string }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.color};
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
  width: 100%;
  max-width: 200px;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    width: auto;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const Result = styled.div<{ visible: boolean }>`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.visible ? '#f8f9fa' : 'transparent'};
  border-radius: 5px;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 1.3rem;
      margin-bottom: 0.75rem;
    }
  }
`;

export const NavigationButton = styled(Button)`
  margin-top: 0.75rem;
  background-color: #6c757d;
  
  &:hover {
    background-color: #5a6268;
  }

  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 1rem;
  }
`;

export const Animals = styled.div<{ side: 'left' | 'right' | 'center' }>`
  position: absolute;
  ${props => props.side === 'left' ? 'left: 10px' : props.side === 'right' ? 'right: 10px' : 'left: 50%'};
  ${props => props.side === 'center' && 'transform: translateX(-50%)'};
  bottom: 10px;
  font-size: 20px;
  transition: all 0.5s ease;
  z-index: 600;

  @media (min-width: ${breakpoints.tablet}) {
    ${props => props.side === 'left' ? 'left: 20px' : props.side === 'right' ? 'right: 20px' : 'left: 50%'};
    bottom: 20px;
    font-size: 24px;
  }
`;

export const Progress = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;

  @media (min-width: ${breakpoints.tablet}) {
    top: 1rem;
    right: 1rem;
    font-size: 0.9rem;
  }
`;

export const TargetArea = styled.div<{ isActive: boolean }>`
  position: absolute;
  border: 2px dashed ${props => props.isActive ? '#4CAF50' : '#ccc'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 50;
  opacity: 0.5;
  background-color: ${props => props.isActive ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
`;

export const Vignette = styled.div<{ intensity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 500;
  transition: all 0.2s ease;
  background: ${props => `radial-gradient(
    circle at 50% 50%,
    transparent ${100 - props.intensity * 50}%,
    rgba(76, 175, 80, ${props.intensity * 0.5}) 100%
  )`};
`;

export const PuzzleEffect = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform-origin: center center;
  animation: ${fadeInScale} 0.5s ease-out forwards;
  pointer-events: none;
  z-index: 550;
  font-size: 48px;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 64px;
  }
`;

export const RainEffect = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.active ? '150px' : '0'};
  opacity: ${props => props.active ? 0.7 : 0};
  transition: all 0.5s ease;
  background: repeating-linear-gradient(
    transparent 0px,
    rgba(120, 120, 255, 0.2) 3px,
    transparent 6px
  );
  pointer-events: none;
  z-index: 540;
`;

export const Puddle = styled.div<{ x: number; y: number }>`
  position: absolute;
  left: ${props => props.x - 40}px;
  top: ${props => props.y - 20}px;
  width: 80px;
  height: 40px;
  background: radial-gradient(
    ellipse at center,
    rgba(120, 120, 255, 0.3) 0%,
    rgba(120, 120, 255, 0.1) 70%,
    transparent 100%
  );
  border-radius: 50%;
  transform: perspective(100px) rotateX(60deg);
  animation: ${fadeInScale} 0.5s ease-out forwards;
  pointer-events: none;
  z-index: 545;
`; 