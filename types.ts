export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  stats?: ProjectStat[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}
