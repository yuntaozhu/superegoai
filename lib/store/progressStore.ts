
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../../types';

interface ProgressState {
  // Key format: "courseId:moduleIndex:itemIndex"
  completedItems: Record<string, boolean>;
  toggleItem: (courseId: string, moduleIndex: number, itemIndex: number) => void;
  getCourseProgress: (course: Course) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedItems: {},
      
      toggleItem: (courseId: string, moduleIndex: number, itemIndex: number) => {
        const key = `${courseId}:${moduleIndex}:${itemIndex}`;
        set((state) => ({
          completedItems: {
            ...state.completedItems,
            [key]: !state.completedItems[key],
          },
        }));
      },

      getCourseProgress: (course: Course) => {
        const state = get();
        let totalItems = 0;
        let completedCount = 0;

        course.syllabus.forEach((module, mIdx) => {
          module.content.forEach((_, iIdx) => {
            totalItems++;
            if (state.completedItems[`${course.id}:${mIdx}:${iIdx}`]) {
              completedCount++;
            }
          });
        });

        if (totalItems === 0) return 0;
        return Math.round((completedCount / totalItems) * 100);
      },
    }),
    {
      name: 'superego-progress-storage',
    }
  )
);
