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
      activeWindowId: null,
      minimizedWindows: [],
    };
  },
  actions: {
    findNodeByName(name) {
      return findSystemNodeByName(name, this.systemDataNodes.root);
    },

    setActiveWindows(systemDataNodeName) {
      const node = this.findNodeByName(systemDataNodeName);
      this.setActiveWindowId(node.uid);
      this.activeWindows.push({
        windowId: node.uid,
        windowContentNode: node,
        isActive: true,
      });
    },

    updateWindowContentByNodeName(windowId, name) {
      const window = this.activeWindows.find(window => window.windowId === windowId);
      window.windowContentNode = this.findNodeByName(name);
    },

    setActiveWindowId(windowId) {
      this.activeWindowId = windowId;
    },


    setActiveWindow(window) {
      this.activeWindow = window;
      // const index = this.activeWindows.indexOf(window);
      // if (index !== -1) {
      //   this.activeWindows.splice(index, 1);
      //   this.activeWindows.push(window);
      // }
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
