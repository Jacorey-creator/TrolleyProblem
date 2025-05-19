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
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding: 0 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`;

export const Scenario = styled.div`
  background-color: white;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem;
  text-align: center;
  position: relative;
  min-height: 600px;
  touch-action: none;
  overflow: hidden;
  transition: transform 0.3s ease;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 1.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 3rem 2rem;
    min-height: 700px;
    margin-bottom: 3rem;
    gap: 2rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0.5rem 0;
    padding: 0 1rem;
    position: relative;
    z-index: 600;
    color: #34495e;

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 1.1rem;
      margin: 0.75rem 0;
    }
  }
`;

export const DraggableItemsContainer = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  min-height: 80px;
  margin-bottom: 1rem;
  z-index: 600;
`;

export const DraggableItem = styled.div<{ isDragging: boolean; isActive: boolean }>`
  position: ${props => props.isDragging ? 'fixed' : 'relative'};
  user-select: none;
  -webkit-user-select: none;
  font-size: 24px;
  z-index: ${props => props.isDragging ? 1000 : 600};
  opacity: ${props => props.isDragging ? 0.85 : props.isActive ? 1 : 0.5};
  cursor: ${props => props.isActive ? (props.isDragging ? 'grabbing' : 'grab') : 'not-allowed'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  touch-action: none;
  -webkit-touch-callout: none;
  will-change: transform;
  transform-origin: center center;
  padding: 1rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
  border-radius: 15px;
  box-shadow: ${props => props.isDragging 
    ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
    : props.isActive 
      ? '0 5px 15px rgba(0, 0, 0, 0.1)' 
      : 'none'};
  backdrop-filter: blur(5px);
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: 28px;
    padding: 1.2rem;
    width: 60px;
    height: 60px;
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.1);
  }

  &:hover {
    transform: ${props => props.isActive && !props.isDragging ? 'scale(1.1)' : 'none'};
    box-shadow: ${props => props.isActive && !props.isDragging ? '0 8px 20px rgba(0, 0, 0, 0.15)' : 'none'};
  }
`;

export const GameArea = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const TracksContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  z-index: 600;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 5rem;
    margin: 5rem auto;
  }
`;

export const Track = styled.div<{ isActive?: boolean }>`
  height: 15px;
  background: linear-gradient(to right, #666666, #888888);
  position: relative;
  width: 100%;
  border-radius: 6px;
  opacity: ${props => props.isActive ? 1 : 0.7};
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 8px;
    border: 3px solid ${props => props.isActive ? '#4CAF50' : 'transparent'};
    pointer-events: none;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 20px;
  }
`;

export const TrackSwitch = styled.div`
  position: absolute;
  left: 20%;
  top: -8px;
  width: 30px;
  height: 30px;
  background: #888;
  border-radius: 50%;
  border: 3px solid #666;
  z-index: 601;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #444;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 40px;
    height: 40px;
    top: -10px;
    
    &:before {
      width: 16px;
      height: 16px;
    }
  }
`;

export const Trolley = styled.div<{ isMoving: boolean }>`
  width: 60px;
  height: 45px;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  position: absolute;
  left: 0;
  top: -20px;
  border-radius: 12px;
  visibility: ${props => props.isMoving ? 'visible' : 'visible'};
  animation: ${props => props.isMoving ? moveAcross : 'none'} 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  transform-origin: center center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:before {
    content: '🚂';
    font-size: 28px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }

  @media (min-width: ${breakpoints.tablet}) {
    width: 80px;
    height: 60px;
    top: -25px;

    &:before {
      font-size: 36px;
    }
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
  top: 1rem;
  left: 1rem;
  font-size: 0.9rem;
  color: #34495e;
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.4s ease;
  max-width: 200px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  @media (min-width: ${breakpoints.tablet}) {
    top: 1.5rem;
    left: 1.5rem;
    font-size: 1rem;
    max-width: 250px;
    padding: 1rem 1.25rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  align-items: center;
  width: 100%;
  padding: 0 1rem;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 1.5rem;
    justify-content: center;
    padding: 0 2rem;
  }
`;

export const Button = styled.button<{ color: string }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  background-color: ${props => props.color};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 250px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  @media (min-width: ${breakpoints.tablet}) {
    padding: 1.2rem 2.5rem;
    font-size: 1.2rem;
    width: auto;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Result = styled.div<{ visible: boolean }>`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${props => props.visible ? '#ffffff' : 'transparent'};
  border-radius: 15px;
  opacity: ${props => props.visible ? 1 : 0};
  transition: all 0.4s ease;
  box-shadow: ${props => props.visible ? '0 5px 20px rgba(0, 0, 0, 0.1)' : 'none'};

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    font-weight: 600;

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 1.5rem;
      margin-bottom: 1.2rem;
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
  ${props => props.side === 'left' ? 'left: 10%' : props.side === 'right' ? 'right: 10%' : 'left: 50%'};
  ${props => props.side === 'center' && 'transform: translateX(-50%)'};
  bottom: 30px;
  font-size: 24px;
  transition: all 0.5s ease;
  z-index: 600;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(2px);

  @media (min-width: ${breakpoints.tablet}) {
    ${props => props.side === 'left' ? 'left: 15%' : props.side === 'right' ? 'right: 15%' : 'left: 50%'};
    bottom: 40px;
    font-size: 28px;
  }
`;

export const Progress = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.9rem;
  color: #34495e;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  @media (min-width: ${breakpoints.tablet}) {
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
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