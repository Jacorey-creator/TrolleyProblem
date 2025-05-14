export interface VisualEffect {
  type: 'RAIN' | 'PUDDLE' | 'SPARKLE' | 'STATIC' | 'VIGNETTE';
  emoji?: string;
  additionalEffects: boolean;
  animationConfig?: {
    duration?: number;
    delay?: number;
    easing?: string;
    particleCount?: number;
  };
}

export interface VignetteEffect {
  intensity: number;
  color: string;
  radius: number;
  targetPosition: Position;
}

export interface PuzzleStep {
  item: string;
  hint: string;
  targetArea: {
    x: number;
    y: number;
    radius: number;
  };
  requiredSteps: string[];
  effect: string;
  visualEffect: VisualEffect;
}

export interface ScenarioOption {
  text: string;
  victims: string;
  count: number;
  emoji: string;
  deadEmoji: string;
}

export interface Scenario {
  id: number;
  description: string;
  options: {
    green: ScenarioOption;
    blue: ScenarioOption;
  };
  puzzleSteps: PuzzleStep[];
  finalHint: string;
}

export interface Position {
  x: number;
  y: number;
}

export type Decision = 'green' | 'blue' | 'saved' | null;

export interface GameState {
  currentScenario: number;
  decision: Decision;
  isAnimating: boolean;
  completed: boolean[];
  dragPosition: Position | null;
  isDragging: boolean;
  showHint: boolean;
  completedSteps: string[];
  activeItem: string | null;
  vignetteEffect: VignetteEffect | null;
  activeEffects: {
    [key: string]: VisualEffect;
  };
} 