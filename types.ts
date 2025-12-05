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
