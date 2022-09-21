// custom classes 
class MyCanvas {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.element.height = window.innerHeight;
        this.element.width = window.innerWidth;
        this.context = this.element.getContext('2d');
        this.drawings = [];
    }

    initialize() {
        this.drawings = JSON.parse(window.localStorage.getItem('drawings')) || [];

        if (this.drawings && this.drawings.length && this.drawings[0]) {
            this.drawings.forEach((drawing) => {
                if (drawing.type === 'circle') {
                    const circle = new Circle(drawing.x, drawing.y, drawing.radius);
                    circle.draw(this.context);
                } else if (drawing.type === 'rectangle') {
                    const rectangle = new Rectangle(drawing.x, drawing.y, drawing.width, drawing.height);
                    rectangle.draw(this.context);
                } else if (drawing.type === 'line') {
                    const line = new Line(drawing.x, drawing.y, drawing.x2, drawing.y2);
                    line.draw(this.context);
                }
            });
        }
    }

    clearCanvas() {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.element.width, this.element.height);
        this.context.restore();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const state = {
        isDragging: false,
        selectedTool: null,
        selectedObject: null,
    };

    // setting canvas
    const canvas = new MyCanvas('canvas');

    // initializing canvas
    canvas.initialize();

    // common functions 
    function getDistance(x, y, x2, y2) {
        const distance = Math.sqrt(Math.pow((x2 - x), 2) + Math.pow((y2 - y), 2));
        return distance;
    }

    function exportCanvasAnPng(canvasElement) {
        const MIME_TYPE = 'image/png';
        const imageUrl = canvasElement.toDataURL(MIME_TYPE);
        let dlLink = document.createElement('a');
        dlLink.download = "filename.png";
        dlLink.href = imageUrl;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(":");

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }

    function setupOffscreenCanvas(canvas, context) { // canvas element
        canvas.offScreenCanvas = document.createElement('canvas');
        canvas.offScreenCanvas.width = canvas.width;
        canvas.offScreenCanvas.height = canvas.height;
        context.drawImage(canvas.offScreenCanvas, 0, 0);
    }

    // events
    canvasTools.addEventListener('click', function (event) {
        event.stopPropagation();
        const btnType = event.target.getAttribute('data-type');
        const btnList = canvasTools.querySelectorAll('button');

        btnList.forEach((btn) => {
            if (btn.hasAttribute('data-active')) {
                btn.removeAttribute('data-active');
            }
        });

        // add attribute
        event.target.setAttribute('data-active', true);
        state.selectedTool = btnType;

        if (btnType === 'export') {
            exportCanvasAnPng(canvas.element);
        }
    });

    canvas.element.addEventListener('pointerdown', function (event) {
        const { clientX, clientY } = event;
        switch (state.selectedTool) {
            case 'square':
                setupOffscreenCanvas(canvas.element, canvas.context);
                state.isDragging = true;
                state.selectedObject = new Rectangle(clientX, clientY);
                break;
            case 'circle':
                setupOffscreenCanvas(canvas.element, canvas.context);
                state.isDragging = true;
                state.selectedObject = new Circle(clientX, clientY);
                break;
            case 'line':
                state.isDragging = true;
                state.selectedObject = new Line(clientX, clientY);
                break;
            default:
                console.log('nothing selected');
                break;
        }
    });

    canvas.element.addEventListener('pointermove', function (event) {
        if (state.selectedObject) {
            if (state.selectedTool === 'square' && state.isDragging) {
                state.selectedObject.setWidth(event.clientX);
                state.selectedObject.setHeight(event.clientY);
                canvas.clearCanvas();
                // canvas.initialize();
                state.selectedObject.draw(canvas.context);
            } else if (state.selectedTool === 'circle' && state.isDragging) {
                state.selectedObject.setRadius(event.clientX, event.clientY);
                canvas.clearCanvas();
                // canvas.initialize();
                state.selectedObject.draw(canvas.context);
            } else if (state.selectedTool === 'line' && state.isDragging) {
                state.selectedObject.setDimensions(event.clientX, event.clientY);
                canvas.clearCanvas();
                // canvas.initialize();
                state.selectedObject.draw(canvas.context);
            } else if (state.selectedTool === 'select') {
                const distance = getDistance(state.selectedObject.x, state.selectedObject.y, event.clientX, event.clientY);
                console.log('distance: ', distance);
            }
        }
    });

    canvas.element.addEventListener('pointerup', function (event) {
        const objects = ["square", "circle", "line"];
        if (objects.includes(state.selectedTool)) {
            state.isDragging = false;
            canvas.drawings.push(state.selectedObject);

            // setting drawings to local storage
            window.localStorage.removeItem('drawings');
            window.localStorage.setItem('drawings', JSON.stringify(canvas.drawings));
        } else if (state.selectedTool === 'select') {
            state.selectedObject.setOptions({ strokeColor: "red" });
        }

        canvas.initialize();
    });
});


