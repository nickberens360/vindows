import fileSystem from '@/data/fileSystem';
import { findSystemNodeByName } from '@/utilities/systemUtils';
import { defineStore } from 'pinia';


export const useWindowManagerStore = defineStore('windowManager', {
  state: () => {
    return {
      systemDataNodes: JSON.parse(JSON.stringify(fileSystem)),
      activeWindow: {},
      activeWindowContent: {},
      activeWindows: [],
      minimizedWindows: [],
      isMinimizedComplete: false,
    };
  },
  actions: {
    findNodeByName(name) {
      return findSystemNodeByName(name, this.systemDataNodes.root);
    },
    addToActiveWindows(routeName, openInNewWindow = true) {
      console.log('adding to active windows', routeName, openInNewWindow);
      const node = this.findNodeByName(routeName);
      this.activeWindow = {
        windowId: node.uid,
        windowContentNode: node,
      };
      this.setActiveWindow(this.activeWindow, this.activeWindow.windowContentNode.name);
      if (!openInNewWindow) return;
      if (this.activeWindows.find(window => window.windowId === node.uid)) return;
      this.activeWindows.push({
        windowId: node.uid,
        windowContentNode: node,
      });
    },

    updateWindowContentByNodeName(windowId, name) {
      console.log('updating window content by node name', windowId, name);
      const window = this.activeWindows.find(window => window.windowId === windowId);
      window.windowContentNode = this.findNodeByName(name);
    },

    setActiveWindow(window, routeName) {
      console.log('setting active window', window);
      this.activeWindow = window;
      this.$router.push({ name: routeName});
      const index = this.activeWindows.findIndex((item) => item.windowId === window.windowId);
      if (index !== -1) {
        this.activeWindows.splice(index, 1);
        this.activeWindows.push(window);
      }
    },


    removeActiveWindow(window) {
      console.log('removing active window', window);
      let index = this.activeWindows.indexOf(window);
      this.activeWindows.splice(index, 1);
    },
    minimizeWindow(window) {
      console.log('minimizing window', window);
      if (this.minimizedWindows.includes(window)) return;
      this.minimizedWindows.push(window);
      // this.minimizedWindows.reverse();
    },
    removeMinimizedWindow(window) {
      console.log('removing minimized window', window);
      const index = this.minimizedWindows.findIndex((item) => item.windowId === window.windowId);
      this.minimizedWindows.splice(index, 1);
      this.addToActiveWindows(window.windowContentNode.name);

    }
  },
  // persist: true,
});
