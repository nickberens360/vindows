import { defineStore } from 'pinia';
import fileSystem from '@/data/fileSystem';

export const useUiStore = defineStore('ui', {
  state: () => {
    return {
      systemWindows: JSON.parse(JSON.stringify(fileSystem)),
      windows: [
        {
          id: 'about',
          title: 'About',
          windowType: 'FileWindow',
          content: 'AboutView',
        },
        {
          id: 'projects',
          title: 'Projects',
          windowType: 'FileWindow',
          content: 'ProjectsView',
        },

        // {
        //   id: 'testTwo',
        //   title: 'Test Two',
        // },
        // {
        //   id: 'testThree',
        //   title: 'Test Three',
        // }
      ],
      activeWindow: {},
      activeWindows: [
        {
          id: 'explorer',
          title: 'Explorer',
          windowType: 'FileWindow',
          content: 'AboutView',
        },
      ],
      minimizedWindows: [],
    };
  },
  actions: {
    setActiveWindow(window) {
      this.activeWindow = window;
      const index = this.activeWindows.indexOf(window);
      if (index !== -1) {
        this.activeWindows.splice(index, 1);
        this.activeWindows.push(window);
      }
    },
    addActiveWindow(window) {
      console.log('addActiveWindow', window);
      this.setActiveWindow(window);
      if (this.activeWindows.includes(window)) return;
      this.activeWindows.push(window);
      if (this.minimizedWindows.includes(window)) {
        this.removeMinimizedWindow(window);
      }
    },
    removeActiveWindow(window) {
      let index = this.activeWindows.indexOf(window);
      this.activeWindows.splice(index, 1);
    },
    minimizeWindow(window) {
      if (this.minimizedWindows.includes(window)) return;
      this.minimizedWindows.push(window);
    },
    removeMinimizedWindow(window) {
      let index = this.minimizedWindows.indexOf(window);
      this.minimizedWindows.splice(index, 1);
    }
  }
});
