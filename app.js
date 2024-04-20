// Import EngineCore namespace
import { EngineCore } from './enginecore.js';

// Initialize EngineCore modules
EngineCore.init('sceneCanvas');

// Define canvas-related functions for the scene editor
const SceneEditor = {
    init: function() {
        // Add initialization code here
    },

    // Function to load a background image into the canvas
    loadBackground: function(imagePath) {
        const background = new Image();
        background.onload = () => {
            EngineCore.SceneManager.currentScene.background = background;
        };
        background.onerror = () => {
            console.error(`Failed to load background image '${imagePath}'.`);
        };
        background.src = imagePath;
    }
};

// Initialize scene editor
SceneEditor.init();

// Example usage:
SceneEditor.loadBackground('background.jpg');
