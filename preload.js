const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Menu actions
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-new-habit', callback)
    ipcRenderer.on('menu-new-goal', callback)
    ipcRenderer.on('menu-settings', callback)
    ipcRenderer.on('menu-about', callback)
  },

  // Remove listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  },

  // Platform info
  platform: process.platform,
  
  // App version
  version: process.env.npm_package_version || '1.0.0'
})
