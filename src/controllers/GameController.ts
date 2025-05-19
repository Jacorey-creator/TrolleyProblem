import { GameState, Position, Decision, Scenario } from '../models/types';
import { scenarios } from '../models/scenarios';

export class GameController {
  private state: GameState;
  private setState: (state: Partial<GameState>) => void;

  constructor(initialState: GameState, setState: (state: Partial<GameState>) => void) {
    this.state = initialState;
    this.setState = setState;
  }

  private getCurrentScenario(): Scenario {
    return scenarios[this.state.currentScenario];
  }

  private resetItemPosition(item: string | null): void {
    if (item) {
      const index = this.getCurrentScenario().puzzleSteps.findIndex(step => step.item === item);
      this.setState({
        dragPosition: { x: 20 + index * 60, y: 20 }
      });
    }
  }

  public handleDragStart = (position: Position, item: string): void => {
    this.setState({
      dragPosition: position,
      isDragging: true,
      activeItem: item
    });
  };

  public handleDragMove = (position: Position): void => {
    if (this.state.isDragging) {
      this.setState({ dragPosition: position });
    }
  };

  public handleDragEnd = (): void => {
    if (!this.state.dragPosition || !this.state.activeItem) {
      this.setState({
        isDragging: false,
        dragPosition: null,
        activeItem: null
      });
      return;
    }

    const scenario = this.getCurrentScenario();
    const currentStep = scenario.puzzleSteps.find(step => step.item === this.state.activeItem);
    
    if (currentStep) {
      const { targetArea, requiredSteps, effect } = currentStep;
      const distance = Math.sqrt(
        Math.pow(this.state.dragPosition.x - targetArea.x, 2) + 
        Math.pow(this.state.dragPosition.y - targetArea.y, 2)
      );

      const isInTargetArea = distance <= targetArea.radius;
      const hasRequirements = requiredSteps.every(step => this.state.completedSteps.includes(step));

      if (isInTargetArea && hasRequirements) {
        // Complete the step
        this.setState({
          completedSteps: [...this.state.completedSteps, effect],
          isDragging: false,
          dragPosition: null,
          activeItem: null
        });
      } else {
        // Show visual feedback that the step can't be completed yet
        const feedbackDuration = hasRequirements ? 0 : 500; // Only show feedback if requirements not met
        if (!hasRequirements) {
          // You could trigger a visual feedback here if needed
          console.log("Can't complete this step yet - requirements not met");
        }
        
        setTimeout(() => {
          // Reset position
          this.resetItemPosition(this.state.activeItem);
          this.setState({
            isDragging: false,
            dragPosition: null,
            activeItem: null
          });
        }, feedbackDuration);
      }
    } else {
      this.setState({
        isDragging: false,
        dragPosition: null,
        activeItem: null
      });
    }
  };

  public handleDecision = (choice: Decision): void => {
    const scenario = this.getCurrentScenario();
    const finalStep = scenario.puzzleSteps[scenario.puzzleSteps.length - 1];
    
    if (this.state.completedSteps.includes(finalStep.effect)) {
      this.setState({ decision: 'saved' });
    } else {
      this.setState({ 
        isAnimating: true,
        decision: choice // Set decision immediately to show the correct trolley
      });
      setTimeout(() => {
        this.setState({
          isAnimating: false,
          completed: this.state.completed.map((val, idx) => 
            idx === this.state.currentScenario ? true : val
          )
        });
      }, 3000); // Match the trolley animation duration
    }
  };

  public handleNext = (): void => {
    const nextScenario = this.state.currentScenario < scenarios.length - 1 ? 
      this.state.currentScenario + 1 : 0;
      
    this.setState({
      currentScenario: nextScenario,
      decision: null,
      completedSteps: [],
      showHint: false
    });
  };

  public resetScenario = (): void => {
    this.setState({
      decision: null,
      completedSteps: [],
      showHint: false
    });
  };

  public showHintIfNeeded = (): void => {
    if (!this.state.decision && !this.state.isAnimating) {
      this.setState({ showHint: true });
    }
  };

  public isStepAvailable = (step: string): boolean => {
    // Allow dragging of any step
    return true;
  };

  public isLastScenario = (): boolean => {
    return this.state.currentScenario === scenarios.length - 1;
  };
} 