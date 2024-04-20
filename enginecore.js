// Define the EngineCore namespace
const EngineCore = {};

// Renderer module
EngineCore.Renderer = {
    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
    },

    drawText: function(text, x, y, font, color) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawBackground: function(background) {
        this.context.drawImage(background.image, 0, 0, this.canvas.width, this.canvas.height);
    },

    drawSprite: function(sprite) {
        this.context.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height);
    }
};

// Scene Layer class
class SceneLayer {
    constructor(name) {
        this.name = name;
        this.sprites = [];
    }

    addSprite(sprite) {
        this.sprites.push(sprite);
    }

    removeSprite(sprite) {
        const index = this.sprites.indexOf(sprite);
        if (index !== -1) {
            this.sprites.splice(index, 1);
        }
    }

    render(renderer) {
        this.sprites.forEach(sprite => {
            renderer.drawSprite(sprite);
        });
    }
}

// Sprite class
class Sprite {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    scale(factor) {
        this.width *= factor;
        this.height *= factor;
    }

    rotate(angle) {
        // Implement rotation logic if needed
    }
}

// Scene class
class Scene {
    constructor(name, background) {
        this.name = name;
        this.background = background;
        this.layers = [];
        this.script = '';
    }

    addLayer(layer) {
        this.layers.push(layer);
    }

    removeLayer(layer) {
        const index = this.layers.indexOf(layer);
        if (index !== -1) {
            this.layers.splice(index, 1);
        }
    }

    render(renderer) {
        renderer.drawBackground(this.background);
        this.layers.forEach(layer => {
            layer.render(renderer);
        });
    }

    executeScript() {
        // Parse and execute script commands
        const commands = this.script.split('\n');
        commands.forEach(command => {
            EngineCore.GameLogic.executeCommand(command.trim());
        });
    }
}

// Input Manager module
EngineCore.InputManager = {
    mouseX: 0,
    mouseY: 0,

    init: function() {
        EngineCore.Renderer.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    },

    handleMouseDown: function(event) {
        this.mouseX = event.clientX - EngineCore.Renderer.canvas.getBoundingClientRect().left;
        this.mouseY = event.clientY - EngineCore.Renderer.canvas.getBoundingClientRect().top;

        EngineCore.SceneManager.currentScene.layers.forEach(layer => {
            layer.sprites.forEach(sprite => {
                if (sprite.isClicked(this.mouseX, this.mouseY)) {
                    console.log('Sprite clicked:', sprite);
                    // Implement logic for sprite click event
                }
            });
        });
    },

    handleKeyDown: function(event) {
        // Handle key down event
        // Example: EngineCore.GameLogic.handleKeyDown(event.key);
    }
};

// Game Logic module
EngineCore.GameLogic = {
    init: function() {
        // Add initialization code here
    },

    executeScript: function(script) {
        const commands = script.split('\n');
        commands.forEach(command => {
            this.executeCommand(command.trim());
        });
    },

    executeCommand: function(command) {
        const tokens = command.split(' ');
        const action = tokens[0];

        switch (action) {
            case 'move':
                // Parse and execute move command
                break;
            case 'play':
                // Parse and execute play command
                break;
            case 'show':
                // Parse and execute show command
                break;
            case 'change':
                EngineCore.SceneManager.loadScene(tokens[1]);
                break;
            default:
                console.error(`Unknown command: ${action}`);
        }
    },

    moveSprite: function(tokens) {
        // Implement logic to move sprites
        const spriteName = tokens[1];
        const dx = parseFloat(tokens[2]);
        const dy = parseFloat(tokens[3]);
        // Update sprite position
        // Example: EngineCore.SceneManager.currentScene.getSprite(spriteName).move(dx, dy);
    },

    playSound: function(tokens) {
        // Implement logic to play sounds
        const soundName = tokens[1];
        // Example: EngineCore.AssetManager.playSound(soundName);
    },

    showText: function(tokens) {
        // Implement logic to display text
        const text = tokens.slice(1).join(' ');
        // Example: EngineCore.UIManager.showText(text);
    },

    changeScene: function(tokens) {
        // Implement logic to change scenes
        const sceneName = tokens[1];
        // Example: EngineCore.SceneManager.loadScene(sceneName);
    }
};

// Asset Manager module
EngineCore.AssetManager = {
    assets: {},

    init: function() {
        // Add initialization code here
    },

    loadAsset: function(assetType, assetName, assetPath) {
        switch (assetType) {
            case 'image':
                this.loadImage(assetName, assetPath);
                break;
            case 'sound':
                // Load sound logic
                break;
        }
    },

    loadImage: function(imageName, imagePath) {
        const image = new Image();
        image.onload = () => {
            this.assets[imageName] = image;
            console.log(`Image '${imageName}' loaded.`);
        };
        image.onerror = () => {
            console.error(`Failed to load image '${imageName}' from '${imagePath}'.`);
        };
        image.src = imagePath;
    },

    getImage: function(imageName) {
        return this.assets[imageName];
    }
};

// SceneManager module
EngineCore.SceneManager = {
    scenes: {},
    currentScene: null,

    init: function() {
        // Add initialization code here
    },

    createScene: function(name, background) {
        const scene = new Scene(name, background);
        this.scenes[name] = scene;
        return scene;
    },

    loadScene: function(sceneName) {
        if (this.scenes[sceneName]) {
            this.currentScene = this.scenes[sceneName];
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    },

    addLayerToScene: function(sceneName, layer) {
        if (this.scenes[sceneName]) {
            this.scenes[sceneName].addLayer(layer);
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    },

    removeLayerFromScene: function(sceneName, layer) {
        if (this.scenes[sceneName]) {
            this.scenes[sceneName].removeLayer(layer);
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    }
};

// Scene Editor module
EngineCore.SceneEditor = {
    init: function() {
        // Add initialization code here
    },

    // Function to load a background image into the scene editor
    loadBackground: function(sceneName, backgroundImagePath) {
        const background = new Image();
        background.onload = () => {
            // Create or update the background for the specified scene
            const scene = EngineCore.SceneManager.scenes[sceneName];
            if (scene) {
                scene.background = background;
            } else {
                console.error(`Scene '${sceneName}' does not exist.`);
            }
        };
        background.onerror = () => {
            console.error(`Failed to load background image '${backgroundImagePath}'.`);
        };
        background.src = backgroundImagePath;
    },

    // Function to add a new layer to a scene
    addLayerToScene: function(sceneName, layerName) {
        const scene = EngineCore.SceneManager.scenes[sceneName];
        if (scene) {
            const layer = new SceneLayer(layerName);
            scene.addLayer(layer);
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    },

    // Function to remove a layer from a scene
    removeLayerFromScene: function(sceneName, layerName) {
        const scene = EngineCore.SceneManager.scenes[sceneName];
        if (scene) {
            const layer = scene.layers.find(layer => layer.name === layerName);
            if (layer) {
                scene.removeLayer(layer);
            } else {
                console.error(`Layer '${layerName}' does not exist in scene '${sceneName}'.`);
            }
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    },

    // Function to add a sprite to a layer in a scene
    addSpriteToLayer: function(sceneName, layerName, sprite) {
        const scene = EngineCore.SceneManager.scenes[sceneName];
        if (scene) {
            const layer = scene.layers.find(layer => layer.name === layerName);
            if (layer) {
                layer.addSprite(sprite);
            } else {
                console.error(`Layer '${layerName}' does not exist in scene '${sceneName}'.`);
            }
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    },

    // Function to remove a sprite from a layer in a scene
    removeSpriteFromLayer: function(sceneName, layerName, sprite) {
        const scene = EngineCore.SceneManager.scenes[sceneName];
        if (scene) {
            const layer = scene.layers.find(layer => layer.name === layerName);
            if (layer) {
                layer.removeSprite(sprite);
            } else {
                console.error(`Layer '${layerName}' does not exist in scene '${sceneName}'.`);
            }
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
        }
    },

    // Function to define an interactive area in a scene
    defineInteractiveArea: function(sceneName, layerName, areaType, areaData, script) {
        // Implement logic to define interactive areas (rectangles, polygons, masks)
        // and associate them with scripts
    },

    // Function to export a scene to a compatible format (e.g., JSON)
    exportScene: function(sceneName) {
        const scene = EngineCore.SceneManager.scenes[sceneName];
        if (scene) {
            // Convert scene data to a compatible format and return
            return JSON.stringify(scene);
        } else {
            console.error(`Scene '${sceneName}' does not exist.`);
            return null;
        }
    },

    // Function to import a scene from a compatible format (e.g., JSON)
    importScene: function(sceneData) {
        // Parse scene data and create Scene objects
        return JSON.parse(sceneData);
    }
};

// Initialize engine core modules
EngineCore.init = function(canvasId) {
    EngineCore.Renderer.init(canvasId);
    EngineCore.InputManager.init();
    EngineCore.GameLogic.init();
    EngineCore.AssetManager.init();
    EngineCore.SceneManager.init();
};

// Start the game loop
EngineCore.start = function() {
    function gameLoop() {
        EngineCore.SceneManager.update();
        EngineCore.Renderer.clear();
        if (EngineCore.SceneManager.currentScene) {
            EngineCore.SceneManager.currentScene.render(EngineCore.Renderer);
        }
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
};

// Expose EngineCore namespace
export { EngineCore };
