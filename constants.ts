import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Shadow Assassin",
    category: "Game Design",
    description: "A stealth-action RPG featuring advanced AI perception systems and fluid movement mechanics in a cyberpunk metropolis.",
    image: "/assets/ninja.png",
    color: "#ff1e00",
    tags: ["Unreal Engine 5", "AI Systems", "C++"],
    stats: [
      { label: "STEALTH", value: "S-RANK" },
      { label: "ACROBATICS", value: "FLUID" },
      { label: "KILL_CNT", value: "999+" },
      { label: "STATUS", value: "GOLD" }
    ]
  },
  {
    id: 2,
    title: "Ocean King",
    category: "World Building",
    description: "Open-world naval adventure with dynamic weather systems and procedural island generation.",
    image: "/assets/pirate.png",
    color: "#00f2ff",
    tags: ["Unity", "HLSL", "Proc-Gen"],
    stats: [
      { label: "MAP_SIZE", value: "INF" },
      { label: "WATER", value: "REAL" },
      { label: "PHYSICS", value: "CHAOS" },
      { label: "ADV", value: "EPIC" }
    ]
  },
  {
    id: 3,
    title: "Relic Hunter",
    category: "Level Design",
    description: "Puzzle-solving exploration game set in ancient ruins mixed with lost technology. Deep lore integration.",
    image: "/assets/hunter.png",
    color: "#fbbf24",
    tags: ["Lumen", "Level Art", "Lore"],
    stats: [
      { label: "PUZZLES", value: "HARD" },
      { label: "LORE", value: "DEEP" },
      { label: "ATMOS", value: "RICH" },
      { label: "USER", value: "9.8" }
    ]
  },
  {
    id: 4,
    title: "Neon Drift",
    category: "3D Environments",
    description: "Immersive synthwave-inspired race tracks created with custom shader graphs.",
    image: "https://picsum.photos/seed/neon/800/600",
    color: "#d946ef",
    tags: ["Blender", "Shaders", "Optimized"],
    stats: [
      { label: "SPEED", value: "MACH 1" },
      { label: "VISUALS", value: "NEON" },
      { label: "FPS", value: "144+" },
      { label: "VIBE", value: "CHILL" }
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "UI Design", level: 95, icon: "🎨" },
  { name: "Unreal Engine", level: 88, icon: "🎮" },
  { name: "3D Modeling", level: 82, icon: "📐" },
  { name: "React/TS", level: 90, icon: "💻" },
  { name: "Animation", level: 85, icon: "🎬" }
];
