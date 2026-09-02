export class DrawingEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.brushSize = options.brushSize || 11;
    this.onChange = options.onChange || (() => {});
    this.onDrawPoint = options.onDrawPoint || (() => {});
    this.strokes = [];
    this.redoStack = [];
    this.activeStroke = null;
    this.isDrawing = false;
    this.resize();
    this.bind();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    const snapshot = this.strokes.slice();
    this.canvas.width = Math.max(320, Math.round(rect.width * scale));
    this.canvas.height = Math.max(320, Math.round(rect.height * scale));
    this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    this.cssWidth = rect.width;
    this.cssHeight = rect.height;
    this.strokes = snapshot;
    this.render();
  }

  bind() {
    this.canvas.addEventListener("pointerdown", (event) => this.start(event));
    this.canvas.addEventListener("pointermove", (event) => this.move(event));
    window.addEventListener("pointerup", (event) => this.end(event));
    window.addEventListener("pointercancel", (event) => this.end(event));
    window.addEventListener("resize", () => this.resize());
  }

  setBrushSize(size) {
    this.brushSize = Number(size);
  }

  getPoint(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      t: performance.now()
    };
  }

  start(event) {
    event.preventDefault();
    this.canvas.setPointerCapture?.(event.pointerId);
    const point = this.getPoint(event);
    this.activeStroke = { size: this.brushSize, points: [point] };
    this.isDrawing = true;
    this.redoStack = [];
    this.onDrawPoint(point);
    this.render();
  }

  move(event) {
    if (!this.isDrawing || !this.activeStroke) return;
    event.preventDefault();
    const point = this.getPoint(event);
    const points = this.activeStroke.points;
    const last = points[points.length - 1];
    if (Math.hypot(point.x - last.x, point.y - last.y) < 1.5) return;
    points.push(point);
    this.onDrawPoint(point);
    this.render();
  }

  end(event) {
    if (!this.isDrawing || !this.activeStroke) return;
    event.preventDefault();
    if (this.activeStroke.points.length === 1) {
      const p = this.activeStroke.points[0];
      this.activeStroke.points.push({ ...p, x: p.x + 0.1 });
    }
    this.strokes.push(this.activeStroke);
    this.activeStroke = null;
    this.isDrawing = false;
    this.onChange(this.strokes.length);
    this.render();
  }

  undo() {
    const stroke = this.strokes.pop();
    if (stroke) this.redoStack.push(stroke);
    this.onChange(this.strokes.length);
    this.render();
  }

  redo() {
    const stroke = this.redoStack.pop();
    if (stroke) this.strokes.push(stroke);
    this.onChange(this.strokes.length);
    this.render();
  }

  clear() {
    this.strokes = [];
    this.redoStack = [];
    this.activeStroke = null;
    this.isDrawing = false;
    this.onChange(0);
    this.render();
  }

  hasDrawing() {
    return this.strokes.length > 0 || Boolean(this.activeStroke);
  }

  exportCanvas(width = 420, height = 420) {
    const out = document.createElement("canvas");
    out.width = width;
    out.height = height;
    const ctx = out.getContext("2d");
    const sx = width / this.cssWidth;
    const sy = height / this.cssHeight;
    ctx.scale(sx, sy);
    this.drawStrokes(ctx, [...this.strokes, ...(this.activeStroke ? [this.activeStroke] : [])]);
    return out;
  }

  render() {
    this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    this.drawStrokes(this.ctx, this.strokes);
    if (this.activeStroke) this.drawStrokes(this.ctx, [this.activeStroke]);
  }

  drawStrokes(ctx, strokes) {
    ctx.save();
    ctx.strokeStyle = "#171512";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokes) {
      ctx.lineWidth = stroke.size;
      const pts = stroke.points;
      if (pts.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }
    ctx.restore();
  }
}
