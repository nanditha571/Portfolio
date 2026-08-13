import type { ThemeDefinition } from '@/types/portfolio';
import NeonCircuit from '@/themes/neon-circuit/NeonCircuit';
import Monochrome from '@/themes/monochrome/Monochrome';
import QuantumMind from '@/themes/quantum-mind/QuantumMind';
import Pixelverse from '@/themes/pixelverse/Pixelverse';
import EcoCode from '@/themes/ecocode/EcoCode';
import Orbit from '@/themes/orbit/Orbit';
import Prism from '@/themes/prism/Prism';
import RootAccess from '@/themes/root-access/RootAccess';
import Aether from '@/themes/aether/Aether';
import Nexus from '@/themes/nexus/Nexus';

export const themeRegistry: ThemeDefinition[] = [
  {
    id: 'neon-circuit',
    name: 'Neon Circuit',
    category: 'Cyberpunk',
    description: 'A futuristic cyberpunk portfolio with neon glow effects, glassmorphism cards, and animated grid backgrounds.',
    preview: 'gradient-to-br from-cyan-500 to-blue-600',
    accent: '#00f0ff',
    Component: NeonCircuit,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    category: 'Minimal',
    description: 'An elegant black-and-white portfolio inspired by luxury brands and editorial design with exquisite typography.',
    preview: 'bg-gradient-to-br from-gray-900 to-gray-700',
    accent: '#ffffff',
    Component: Monochrome,
  },
  {
    id: 'quantum-mind',
    name: 'Quantum Mind',
    category: 'AI / Research',
    description: 'A dark, sophisticated portfolio designed for AI/ML researchers with neural network visualizations and data-driven aesthetics.',
    preview: 'bg-gradient-to-br from-purple-900 to-indigo-800',
    accent: '#a78bfa',
    Component: QuantumMind,
  },
  {
    id: 'pixelverse',
    name: 'Pixelverse',
    category: 'Creative',
    description: 'A vibrant, playful portfolio with bold gradients, floating shapes, and experimental interactive elements.',
    preview: 'bg-gradient-to-br from-pink-500 to-yellow-400',
    accent: '#ff6b9d',
    Component: Pixelverse,
  },
  {
    id: 'ecocode',
    name: 'EcoCode',
    category: 'Sustainability',
    description: 'A sustainability-focused portfolio blending natural elements with futuristic tech aesthetics and organic shapes.',
    preview: 'bg-gradient-to-br from-emerald-600 to-teal-800',
    accent: '#10b981',
    Component: EcoCode,
  },
  {
    id: 'orbit',
    name: 'Orbit',
    category: 'Space',
    description: 'A cinematic space-themed portfolio with starfields, nebulae, and planetary elements for a cosmic experience.',
    preview: 'bg-gradient-to-br from-slate-900 to-blue-950',
    accent: '#60a5fa',
    Component: Orbit,
  },
  {
    id: 'prism',
    name: 'Prism',
    category: 'Holographic',
    description: 'A premium holographic portfolio with realistic glass effects, prismatic light reflections, and iridescent surfaces.',
    preview: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    accent: '#c084fc',
    Component: Prism,
  },
  {
    id: 'root-access',
    name: 'Root Access',
    category: 'Cybersecurity',
    description: 'A cybersecurity-themed terminal portfolio with matrix effects, command-line aesthetics, and green-on-black styling.',
    preview: 'bg-gradient-to-br from-gray-950 to-green-950',
    accent: '#22c55e',
    Component: RootAccess,
  },
  {
    id: 'aether',
    name: 'Aether',
    category: 'Premium',
    description: 'A sophisticated, premium minimal portfolio inspired by Apple design principles with perfect whitespace and precision.',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-300',
    accent: '#000000',
    Component: Aether,
  },
  {
    id: 'nexus',
    name: 'Nexus',
    category: 'Sci-Fi',
    description: 'A futuristic AI command-center portfolio with HUD elements, floating panels, holographic data displays, and energy effects.',
    preview: 'bg-gradient-to-br from-cyan-900 to-blue-900',
    accent: '#06b6d4',
    Component: Nexus,
  },
];

export function getThemeById(id: string): ThemeDefinition | undefined {
  return themeRegistry.find((t) => t.id === id);
}
