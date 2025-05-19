import React, { useState, useRef, useEffect } from 'react';
import { GameController } from './controllers/GameController';
import { scenarios } from './models/scenarios';
import { GameState, Position } from './models/types';
import * as S from './components/styled/GameComponents';

const initialState: GameState = {
  currentScenario: 0,
  decision: null,
  isAnimating: false,
  completed: new Array(scenarios.length).fill(false),
  dragPosition: null,
  isDragging: false,
  showHint: false,
  completedSteps: [],
  activeItem: null,
  vignetteEffect: null,
  activeEffects: {}
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const dragRef = useRef<HTMLDivElement>(null);
  const scenarioRef = useRef<HTMLDivElement>(null);
  const [vignetteIntensity, setVignetteIntensity] = useState(0);
  const [activeTrack, setActiveTrack] = useState<'top' | 'bottom' | null>(null);
  
  const gameController = new GameController(gameState, (newState) => {
    setGameState(current => ({ ...current, ...newState }));
  });

  const getEventPosition = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): Position => {
    const rect = scenarioRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    
    const clientX = 'touches' in e ? 
      (e.touches[0]?.clientX ?? (e as TouchEvent).changedTouches?.[0]?.clientX) : 
      (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? 
      (e.touches[0]?.clientY ?? (e as TouchEvent).changedTouches?.[0]?.clientY) : 
      (e as MouseEvent).clientY;
    
    // Center the item on the cursor by subtracting half the item size
    return {
      x: clientX - rect.left - 25, // 50px width / 2
      y: clientY - rect.top - 25   // 50px height / 2
    };
  };

  const calculateProximity = (position: Position, targetArea: { x: number; y: number; radius: number }): number => {
    if (!position) return 0;
    
    const distance = Math.sqrt(
      Math.pow(position.x - targetArea.x, 2) + 
      Math.pow(position.y - targetArea.y, 2)
    );
    
    // Convert distance to a 0-1 scale where 1 is closest
    const proximity = Math.max(0, 1 - (distance / (targetArea.radius * 2)));
    return proximity;
  };

  const updateVignetteIntensity = (position: Position) => {
    if (!gameState.isDragging || !gameState.activeItem) {
      setVignetteIntensity(0);
      return;
    }

    const currentStep = scenario.puzzleSteps.find(step => 
      step.item === gameState.activeItem && 
      step.requiredSteps.every(req => gameState.completedSteps.includes(req))
    );

    if (currentStep) {
      const proximity = calculateProximity(position, currentStep.targetArea);
      setVignetteIntensity(proximity);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, item: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const position = getEventPosition(e);
    gameController.handleDragStart(position, item);
    updateVignetteIntensity(position);

    // Add global event listeners
    if ('ontouchstart' in window) {
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
      window.addEventListener('touchcancel', handleDragEnd);
    } else {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    }
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!gameState.isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const position = getEventPosition(e);
    gameController.handleDragMove(position);
    updateVignetteIntensity(position);

    // Check if over a track
    const tracks = document.querySelectorAll('.track');
    let newActiveTrack: 'top' | 'bottom' | null = null;

    tracks.forEach((track, index) => {
      const rect = track.getBoundingClientRect();
      const clientY = 'touches' in e ? 
        (e.touches[0]?.clientY ?? (e as TouchEvent).changedTouches?.[0]?.clientY) : 
        (e as MouseEvent).clientY;

      if (clientY >= rect.top && clientY <= rect.bottom) {
        newActiveTrack = index === 0 ? 'top' : 'bottom';
      }
    });

    setActiveTrack(newActiveTrack);
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove event listeners
    if ('ontouchstart' in window) {
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('touchcancel', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    }

    if (!gameState.isDragging) return;

    // Get final position and process the drop
    const position = getEventPosition(e);
    gameController.handleDragMove(position);

    // If over an active track, trigger the appropriate action
    if (activeTrack) {
      gameController.handleDecision(activeTrack === 'top' ? 'green' : 'blue');
    }

    gameController.handleDragEnd();
    setVignetteIntensity(0);
    setActiveTrack(null);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (gameState.isDragging) {
        e.preventDefault();
        e.stopPropagation();
        
        const position = getEventPosition(e);
        if (position) {
          gameController.handleDragMove(position);
        }
      }
    };

    if (gameState.isDragging) {
      if ('ontouchstart' in window) {
        window.addEventListener('touchmove', handleGlobalMove, { passive: false });
        window.addEventListener('touchend', handleDragEnd, { passive: false });
        window.addEventListener('touchcancel', handleDragEnd, { passive: false });
      } else {
        window.addEventListener('mousemove', handleGlobalMove, { passive: false });
        window.addEventListener('mouseup', handleDragEnd, { passive: false });
      }
    }

    return () => {
      if ('ontouchstart' in window) {
        window.removeEventListener('touchmove', handleGlobalMove);
        window.removeEventListener('touchend', handleDragEnd);
        window.removeEventListener('touchcancel', handleDragEnd);
      } else {
        window.removeEventListener('mousemove', handleGlobalMove);
        window.removeEventListener('mouseup', handleDragEnd);
      }
    };
  }, [gameState.isDragging]);

  useEffect(() => {
    const timer = setTimeout(() => {
      gameController.showHintIfNeeded();
    }, 15000);
    return () => clearTimeout(timer);
  }, [gameState.currentScenario, gameState.decision, gameState.isAnimating]);

  const scenario = scenarios[gameState.currentScenario];

  const renderPuzzleEffects = () => {
    return scenario.puzzleSteps.map((step, index) => {
      if (gameState.completedSteps.includes(step.effect)) {
        switch (step.effect) {
          case 'RAIN':
            return (
              <React.Fragment key={`effect-${index}`}>
                <S.RainEffect active={true} />
                <S.PuzzleEffect x={step.targetArea.x - 24} y={step.targetArea.y - 24}>
                  💧
                </S.PuzzleEffect>
              </React.Fragment>
            );
          case 'LILYPAD':
            return (
              <React.Fragment key={`effect-${index}`}>
                <S.Puddle x={step.targetArea.x} y={step.targetArea.y} />
                <S.PuzzleEffect x={step.targetArea.x - 24} y={step.targetArea.y - 24}>
                  🌿
                </S.PuzzleEffect>
              </React.Fragment>
            );
          case 'SAVE':
            return (
              <S.PuzzleEffect 
                key={`effect-${index}`}
                x={step.targetArea.x - 24} 
                y={step.targetArea.y - 24}
              >
                ✨
              </S.PuzzleEffect>
            );
          case 'CARROT':
            return (
              <S.PuzzleEffect 
                key={`effect-${index}`}
                x={step.targetArea.x - 24} 
                y={step.targetArea.y - 24}
              >
                🥕
              </S.PuzzleEffect>
            );
          case 'LADDER':
            return (
              <S.PuzzleEffect 
                key={`effect-${index}`}
                x={step.targetArea.x - 24} 
                y={step.targetArea.y - 24}
              >
                🪜
              </S.PuzzleEffect>
            );
          case 'BREEZE':
            return (
              <S.PuzzleEffect 
                key={`effect-${index}`}
                x={step.targetArea.x - 24} 
                y={step.targetArea.y - 24}
              >
                🍃
              </S.PuzzleEffect>
            );
          case 'HONEY':
            return (
              <S.PuzzleEffect 
                key={`effect-${index}`}
                x={step.targetArea.x - 24} 
                y={step.targetArea.y - 24}
              >
                🍯
              </S.PuzzleEffect>
            );
          default:
            return null;
        }
      }
      return null;
    });
  };

  return (
    <S.Container>
      <S.Title>The Trolley Problem: Puzzle Edition</S.Title>
      <S.Scenario ref={scenarioRef}>
        <S.Progress>Scenario {gameState.currentScenario + 1} of {scenarios.length}</S.Progress>
        <S.SecretHint visible={gameState.showHint}>
          {gameState.completedSteps.length > 0 
            ? scenario.puzzleSteps.find(step => 
                !gameState.completedSteps.includes(step.effect) && 
                step.requiredSteps.every(req => gameState.completedSteps.includes(req)))?.hint
            : scenario.puzzleSteps[0].hint}
        </S.SecretHint>

        {/* Add vignette effect */}
        <S.Vignette intensity={vignetteIntensity} />

        <S.DraggableItemsContainer>
          {scenario.puzzleSteps.map((step, index) => {
            const isStepCompleted = gameState.completedSteps.includes(step.effect);
            const hasRequirements = step.requiredSteps.every(req => gameState.completedSteps.includes(req));
            
            if (!isStepCompleted) {
              return (
                <S.DraggableItem
                  key={index}
                  ref={gameState.activeItem === step.item ? dragRef : undefined}
                  isDragging={gameState.isDragging && gameState.activeItem === step.item}
                  isActive={hasRequirements}
                  style={{
                    left: gameState.activeItem === step.item && gameState.dragPosition 
                      ? `${gameState.dragPosition.x}px` 
                      : undefined,
                    top: gameState.activeItem === step.item && gameState.dragPosition
                      ? `${gameState.dragPosition.y}px`
                      : undefined,
                    position: gameState.isDragging && gameState.activeItem === step.item ? 'fixed' : 'relative',
                    transform: 'translate(0, 0)' // Reset any transforms
                  }}
                  onMouseDown={(e) => handleDragStart(e, step.item)}
                  onTouchStart={(e) => handleDragStart(e, step.item)}
                  title={!hasRequirements ? "Complete previous steps first" : ""}
                >
                  {step.item}
                </S.DraggableItem>
              );
            }
            return null;
          })}
        </S.DraggableItemsContainer>

        <S.GameArea>
          {renderPuzzleEffects()}

          <p>{scenario.description}</p>
          
          <S.TracksContainer>
            <S.Track className="track" isActive={activeTrack === 'top'}>
              <S.TrackSwitch />
              <S.Trolley isMoving={gameState.isAnimating && gameState.decision === 'green'} />
            </S.Track>
            <S.Track className="track" isActive={activeTrack === 'bottom'}>
              <S.Trolley isMoving={gameState.isAnimating && gameState.decision === 'blue'} />
            </S.Track>
          </S.TracksContainer>

          <S.Animals side="left">
            {!gameState.decision && !gameState.completedSteps.includes('SAVE') && 
              scenario.options.green.emoji.repeat(scenario.options.green.count)}
            {gameState.decision === 'green' && scenario.options.green.deadEmoji.repeat(scenario.options.green.count)}
            {gameState.completedSteps.includes('SAVE') && '✨'}
          </S.Animals>
          <S.Animals side="right">
            {!gameState.decision && !gameState.completedSteps.includes('SAVE') && 
              scenario.options.blue.emoji.repeat(scenario.options.blue.count)}
            {gameState.decision === 'blue' && scenario.options.blue.deadEmoji.repeat(scenario.options.blue.count)}
            {gameState.completedSteps.includes('SAVE') && '✨'}
          </S.Animals>
        </S.GameArea>

        <div>
          <p>Press the green button: {scenario.options.green.text}</p>
          <p>Press the blue button: {scenario.options.blue.text}</p>
          <p>What do you choose? Or can you find another way?</p>
          
          {!gameState.decision && !gameState.isAnimating && (
            <S.ButtonContainer>
              <S.Button
                color="#28a745"
                onClick={() => gameController.handleDecision('green')}
              >
                Green Button
              </S.Button>
              <S.Button
                color="#007bff"
                onClick={() => gameController.handleDecision('blue')}
              >
                Blue Button
              </S.Button>
            </S.ButtonContainer>
          )}
        </div>

        <S.Result visible={gameState.decision !== null}>
          {gameState.decision === 'green' && (
            <>
              <h3>You chose to press the green button</h3>
              <p>{scenario.options.green.count} {scenario.options.green.victims} were sacrificed. Was it the right choice?</p>
            </>
          )}
          {gameState.decision === 'blue' && (
            <>
              <h3>You chose to press the blue button</h3>
              <p>{scenario.options.blue.count} {scenario.options.blue.victims} were sacrificed. Was it the right choice?</p>
            </>
          )}
          {gameState.decision === 'saved' && (
            <>
              <h3>Brilliant solution! 🎉</h3>
              <p>{scenario.finalHint}</p>
            </>
          )}
          {gameState.decision && (
            <S.ButtonContainer>
              <S.NavigationButton
                color="#28a745"
                onClick={gameController.handleNext}
              >
                {gameState.currentScenario === scenarios.length - 1 ? 'Start Over' : 'Next Scenario'}
              </S.NavigationButton>
              <S.NavigationButton
                color="#6c757d"
                onClick={gameController.resetScenario}
              >
                Try Again
              </S.NavigationButton>
            </S.ButtonContainer>
          )}
        </S.Result>
      </S.Scenario>
    </S.Container>
  );
};

export default App; 