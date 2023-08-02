import fileSystem from '@/data/fileSystem';
import { findSystemNodeByName } from '@/utilities/systemUtils';
import { defineStore } from 'pinia';


export const useUiStore = defineStore('ui', {
  state: () => {
    return {
      systemDataNodes: JSON.parse(JSON.stringify(fileSystem)),
      activeWindow: {},
      activeWindowContent: {},
      activeWindows: [],
      minimizedWindows: [],
    };
  },
  actions: {
    findNodeByName(name) {
      return findSystemNodeByName(name, this.systemDataNodes.root);
    },

    addToActiveWindows(systemDataNodeName) {
      const node = this.findNodeByName(systemDataNodeName);
      this.activeWindow = {
        windowId: node.uid,
        windowContentNode: node,
      };
      // check active windows for this window by windowId
      if (this.activeWindows.find(window => window.windowId === node.uid)) return;
      this.activeWindows.push({
        windowId: node.uid,
        windowContentNode: node,
      });
    },

    updateWindowContentByNodeName(windowId, name) {
      const window = this.activeWindows.find(window => window.windowId === windowId);
      window.windowContentNode = this.findNodeByName(name);
    },


    setActiveWindow(window) {
      this.activeWindow = window;

      const index = this.activeWindows.findIndex((item) => item.windowId === window.windowId);
      console.log(index);

      if (index !== -1) {
        this.activeWindows.splice(index, 1);
        this.activeWindows.push(window);
      }
    },

    async addActiveWindow(window, openInNewWindow = false) {
      // if (this.activeWindow === window) return;
      if (!openInNewWindow) return;
      this.setActiveWindow(window);
      if (this.activeWindows.includes(window)) return;
      await this.activeWindows.push(window);
      // if (this.activeWindows.includes(window)) return;
      // this.activeWindows.push(window);
      // if (this.minimizedWindows.includes(window)) {
      //   this.removeMinimizedWindow(window);
      // }
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
  },

});
