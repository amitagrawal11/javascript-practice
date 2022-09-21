class Shape {
    constructor(x, y, scale, options) {
        this.x = x || 0;
        this.y = y || 0;
        this.scale = scale || 1;

        const defaultOptions = {
            strokeColor: "black",
            fillColor: "",
            stokeWidth: 0,
        }
        this.options = options || defaultOptions;
    }

    draw() { }
}

class Line extends Shape {
    type = "line";
    constructor(x, y, x2, y2, scale, options) {
        super(x, y, scale, options);
        this.x2 = x2;
        this.y2 = y2;
    }

    setDimensions(x2, y2) {
        this.x2 = x2;
        this.y2 = y2;
    }

    setOptions(options) {
        this.options = options;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.scale(this.scale, this.scale);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.restore();
    }
}

class Circle extends Shape {
    type = "circle";
    constructor(x, y, radius, scale, options) {
        super(x, y, scale, options);
        this.radius = radius || 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setRadius(x2, y2) {
        this.radius = Math.sqrt(Math.pow((x2 - this.x), 2) + Math.pow((y2 - this.y), 2));
    }

    setStyles(styles) {
        this.options = styles;
    }

    setOptions(options) {
        this.options = options;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();

        ctx.scale(this.scale, this.scale);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = this.options.strokeColor;
        ctx.stroke();

        ctx.closePath();
        ctx.restore();
    }
}

class Rectangle extends Shape {
    type = "rectangle";
    constructor(x, y, width, height, scale, options) {
        super(x, y, scale, options);
        this.width = width || 0;
        this.height = height || 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.scale(this.scale, this.scale);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    drawBorder(ctx) {
        ctx.setLineDash([6]);
        ctx.strokeRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    }

    setOptions(options) {
        this.options = options;
    }

    setWidth(x) {
        this.width = (x - this.x);
    }

    setHeight(y) {
        this.height = (y - this.y);
    }
}