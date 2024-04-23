// Import EngineCore namespace
import { EngineCore } from './enginecore.js';

// Scene Editor module
const SceneEditorUI = {
    currentScene: null,
    selectedSprite: null,
    selectedInteractiveArea: null,

    init: function() {
        // Load initial scene if needed
        EngineCore.SceneEditor.init();
        this.setupCanvas();
        this.setupToolbox();
        this.setupInspector();
        this.setupScriptEditor();
        this.setupGame();
    },

    setupCanvas: function() {
        const canvasArea = document.getElementById('canvasArea');
        canvasArea.innerHTML = '<canvas id="sceneCanvas"></canvas>';

        // Initialize engine core modules
        EngineCore.init('sceneCanvas');

        // Add click handlers for selecting sprites, creating interactive areas, etc.
        canvasArea.addEventListener('click', function(event) {
            const mouseX = event.clientX - canvasArea.getBoundingClientRect().left;
            const mouseY = event.clientY - canvasArea.getBoundingClientRect().top;

            // Logic to handle sprite selection
            if (SceneEditorUI.currentScene) {
                SceneEditorUI.currentScene.layers.forEach(layer => {
                    layer.sprites.forEach(sprite => {
                        if (sprite.isClicked(mouseX, mouseY)) {
                            SceneEditorUI.selectedSprite = sprite;
                            // Update inspector panel with sprite properties
                            SceneEditorUI.updateInspector();
                        }
                    });
                });
            }
        });
    },

    setupToolbox: function() {
        // Load sprites using EngineCore.AssetManager
        const spriteLibrary = document.getElementById('spriteLibrary');
        spriteLibrary.innerHTML = '<h2>Sprite Library</h2><ul><li>Sprite 1</li><li>Sprite 2</li><li>Sprite 3</li></ul>';

        // Add event listeners for sprite selection
        const spriteItems = spriteLibrary.querySelectorAll('li');
        spriteItems.forEach(item => {
            item.addEventListener('click', function() {
                SceneEditorUI.selectedSprite = /* Get selected sprite */;
                // Update inspector panel with sprite properties
                SceneEditorUI.updateInspector();
            });
        });
    },

    setupInspector: function() {
        // Logic to update the inspector based on selection
        const inspector = document.getElementById('inspector');
        inspector.innerHTML = '<h2>Inspector Panel</h2><p>Selected Sprite: None</p>';
    },

    setupScriptEditor: function() {
        // UI for creating and editing scripts (tied to interactive areas)
    },

    setupGame: function() {
        // Setup a new game
        const game = new EngineCore.Game('MyGame');
        game.initRenderer('sceneCanvas');
        EngineCore.start();
    },

    // Function to update inspector panel with sprite properties
    updateInspector: function() {
        const inspector = document.getElementById('inspector');
        if (SceneEditorUI.selectedSprite) {
            inspector.innerHTML = `<h2>Inspector Panel</h2><p>Selected Sprite: ${SceneEditorUI.selectedSprite.name}</p>`;
        } else {
            inspector.innerHTML = '<h2>Inspector Panel</h2><p>Selected Sprite: None</p>';
        }
    }
};

// Initialize scene editor
SceneEditorUI.init();
