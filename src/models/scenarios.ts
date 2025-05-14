import { Scenario, VisualEffect } from './types';

const rainEffect: VisualEffect = {
  type: 'RAIN',
  emoji: '💧',
  additionalEffects: true,
  animationConfig: {
    duration: 1000,
    particleCount: 20,
    easing: 'ease-in-out'
  }
};

const puddleEffect: VisualEffect = {
  type: 'PUDDLE',
  emoji: '🌿',
  additionalEffects: true,
  animationConfig: {
    duration: 800,
    easing: 'ease-out'
  }
};

const sparkleEffect: VisualEffect = {
  type: 'SPARKLE',
  emoji: '✨',
  additionalEffects: true,
  animationConfig: {
    duration: 500,
    particleCount: 10,
    easing: 'ease-in-out'
  }
};

const staticEffect: VisualEffect = {
  type: 'STATIC',
  additionalEffects: false
};

export const scenarios: Scenario[] = [
  {
    id: 1,
    description: "A trolley is heading down the tracks. There's a storm brewing...",
    options: {
      green: {
        text: "Two frogs will be run over",
        victims: "frogs",
        count: 2,
        emoji: "🐸",
        deadEmoji: "💀"
      },
      blue: {
        text: "One turtle will be run over",
        victims: "turtle",
        count: 1,
        emoji: "🐢",
        deadEmoji: "💀"
      }
    },
    puzzleSteps: [
      {
        item: "☁️",
        hint: "The clouds look heavy with rain...",
        targetArea: { x: 150, y: 50, radius: 40 },
        requiredSteps: [],
        effect: "RAIN",
        visualEffect: rainEffect
      },
      {
        item: "🌿",
        hint: "A lily pad might float on the new puddle...",
        targetArea: { x: 100, y: 150, radius: 40 },
        requiredSteps: ["RAIN"],
        effect: "LILYPAD",
        visualEffect: puddleEffect
      },
      {
        item: "🪰",
        hint: "Flies are attracted to the water...",
        targetArea: { x: 100, y: 150, radius: 40 },
        requiredSteps: ["LILYPAD"],
        effect: "SAVE",
        visualEffect: sparkleEffect
      }
    ],
    finalHint: "The frogs will follow their food to safety!"
  },
  {
    id: 2,
    description: "The trolley approaches a garden area...",
    options: {
      green: {
        text: "Three butterflies will be run over",
        victims: "butterflies",
        count: 3,
        emoji: "🦋",
        deadEmoji: "💀"
      },
      blue: {
        text: "One rabbit will be run over",
        victims: "rabbit",
        count: 1,
        emoji: "🐰",
        deadEmoji: "💀"
      }
    },
    puzzleSteps: [
      {
        item: "🥕",
        hint: "The carrot looks tasty, but it's too far to reach...",
        targetArea: { x: 200, y: 100, radius: 40 },
        requiredSteps: [],
        effect: "CARROT",
        visualEffect: staticEffect
      },
      {
        item: "🪜",
        hint: "A ladder might help reach higher places...",
        targetArea: { x: 150, y: 150, radius: 40 },
        requiredSteps: ["CARROT"],
        effect: "LADDER",
        visualEffect: staticEffect
      },
      {
        item: "🌸",
        hint: "Flowers might attract the butterflies away...",
        targetArea: { x: 300, y: 100, radius: 40 },
        requiredSteps: ["LADDER"],
        effect: "SAVE",
        visualEffect: sparkleEffect
      }
    ],
    finalHint: "Maybe you can save both groups at once!"
  },
  {
    id: 3,
    description: "The final trolley dilemma involves a complex ecosystem...",
    options: {
      green: {
        text: "Five ants will be run over",
        victims: "ants",
        count: 5,
        emoji: "🐜",
        deadEmoji: "💀"
      },
      blue: {
        text: "Two ladybugs will be run over",
        victims: "ladybugs",
        count: 2,
        emoji: "🐞",
        deadEmoji: "💀"
      }
    },
    puzzleSteps: [
      {
        item: "🍃",
        hint: "A gentle breeze might carry scents...",
        targetArea: { x: 250, y: 80, radius: 40 },
        requiredSteps: [],
        effect: "BREEZE",
        visualEffect: staticEffect
      },
      {
        item: "🍯",
        hint: "The honey pot is attracting attention...",
        targetArea: { x: 150, y: 120, radius: 40 },
        requiredSteps: ["BREEZE"],
        effect: "HONEY",
        visualEffect: staticEffect
      },
      {
        item: "📱",
        hint: "The phone's vibration might guide them...",
        targetArea: { x: 350, y: 150, radius: 40 },
        requiredSteps: ["HONEY"],
        effect: "SAVE",
        visualEffect: sparkleEffect
      }
    ],
    finalHint: "The insects communicate through vibrations!"
  }
]; 