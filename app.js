window.onload = function() {
    const sceneSelect = document.getElementById('scene-select');
    const backgroundInput = document.getElementById('background-input');
    const layerList = document.getElementById('layer-list');
    const sceneCanvas = document.getElementById('scene-canvas');
    const ctx = sceneCanvas.getContext('2d');

    // Dummy data for initial layer list
    const layers = ['Background', 'Foreground', 'Objects'];

    // Populate scene select dropdown with options
    function populateSceneSelect() {
        // You can dynamically fetch scene data if needed
        // For now, let's keep it static
        // Add more options as needed
        const scenes = ['Scene 1', 'Scene 2'];
        scenes.forEach(scene => {
            const option = document.createElement('option');
            option.value = scene.toLowerCase().replace(/\s/g, '-');
            option.textContent = scene;
            sceneSelect.appendChild(option);
        });
    }

    // Populate layer list
    function populateLayerList() {
        layerList.innerHTML = '';
        layers.forEach(layer => {
            const li = document.createElement('li');
            li.textContent = layer;
            layerList.appendChild(li);
        });
    }

    // Event listener for scene selection change
    sceneSelect.addEventListener('change', function() {
        const selectedScene = sceneSelect.value;
        console.log('Selected Scene:', selectedScene);
        // Load and render selected scene
        // Implement this functionality as needed
    });

    // Event listener for background image upload
    backgroundInput.addEventListener('change', function() {
        const file = backgroundInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Render background image on canvas
                    ctx.drawImage(img, 0, 0, sceneCanvas.width, sceneCanvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Event listeners for layer management buttons
    // These are placeholders, actual functionality needs to be implemented
    document.getElementById('add-layer-btn').addEventListener('click', function() {
        layers.push('New Layer');
        populateLayerList();
    });

    document.getElementById('delete-layer-btn').addEventListener('click', function() {
        layers.pop();
        populateLayerList();
    });

    // Initialize scene editor
    populateSceneSelect();
    populateLayerList();
};
