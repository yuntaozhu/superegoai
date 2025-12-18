export interface ModuleItem {
  title: string;
  description: string;
}

export interface CourseModule {
  title: string;
  goal?: string;
  content: ModuleItem[];
}

export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  target: string;     // 面向群体
  format: string;     // 授课方式
  duration: string;   // 学习周期
  outcome: string;    // 学习效果/交付物
  philosophyMap: {
    title: string;
    points: string[];
  };
  syllabus: CourseModule[];
}

export interface PhilosophyPillar {
  title: string;
  concept: string;
  practice: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}