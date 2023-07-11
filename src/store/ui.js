import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => {
    return {
      windows: [
        {
          id: 'testOne',
          title: 'Test One',
        },
        {
          id: 'testTwo',
          title: 'Test Two',
        },
        {
          id: 'testThree',
          title: 'Test Three',
        }
      ],
      activeWindow: {},
      activeWindows: [],
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
      this.activeWindows.push(window);
    },
    removeActiveWindow(window) {
      let index = this.activeWindows.indexOf(window);
      this.activeWindows.splice(index, 1);
    },
    minimizeWindow(window) {
      if (this.minimizedWindows.includes(window)) return;
      this.minimizedWindows.push(window);
    }
  }
});
