// Import EngineCore namespace
import { EngineCore } from './enginecore.js';


// Define canvas-related functions for the scene editor
// Scene Editor Logic
const SceneEditor = {
    currentScene: null,
    selectedSprite: null,
    selectedInteractiveArea: null,

    init: function() {
        // Load initial scene if needed
        this.setupCanvas();
        this.setupToolbox();
        this.setupInspector();
        this.setupScriptEditor();
    },

    setupCanvas: function() {
        // Add click handlers for selecting sprites, creating interactive areas, etc.
        EngineCore.init('sceneCanvas', 'MyNewGame');
        EngineCore.startScene(this.currentScene);

    },

    setupToolbox: function() {
        // Load sprites from EngineCore.AssetManager
        

    },

    setupInspector: function() {
        // Logic to update the inspector based on selection

    },

    setupScriptEditor: function() {
        // UI for creating and editing scripts (tied to interactive areas)
    },

}

// Initialize scene editor
SceneEditor.init();

// Example usage:
SceneEditorUI.loadBackground('Dev Tools/background1.png');
