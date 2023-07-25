import { defineStore } from 'pinia';
import fileSystem from '@/data/fileSystem';

export const useFileManagerStore = defineStore('fileManager', {
  state: () => {
    return {
      systemWindows: JSON.parse(JSON.stringify(fileSystem)),
      activeWindow: null,
      activeWindows: [],
      minimizedWindows: [],
    };
  },

  actions: {
    setActiveWindow(window) {
      this.activeWindow = window;
    },

    addActiveWindow(window) {
      // Check if the window is already in the activeWindows array
      if (!this.activeWindows.includes(window)) {
        // Add the window to the end of the activeWindows array
        this.activeWindows.push(window);
      }

      // Move the added window to the bottom of the array
      const index = this.activeWindows.indexOf(window);
      if (index !== this.activeWindows.length - 1) {
        this.activeWindows.splice(index, 1);
        this.activeWindows.push(window);
      }

      // Set the added window as the activeWindow
      this.setActiveWindow(window);
    },
  },
});
