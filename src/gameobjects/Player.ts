namespace Snake {
    export class PlayerObject implements Kouky.EnginePipelineComponent {

        private _color: Kouky.Color = Kouky.Color.fromHex("#ffa372");
        private _geometry: SquareGeometry;
        private _shader: FlatColorShader;

        public transform: Kouky.Transform;

        public get width(): number { return this._geometry.width; }
        public get height(): number { return this._geometry.height; }

        public start(): void {
            this._geometry = new SquareGeometry(20, 20);
            this.transform = new Kouky.Transform();
            this._shader = new FlatColorShader();
        }
        public end(): void {
        }
        public updateReady(): void {
        }
        public update(time: Kouky.Timestamp): void {
        }
        public render(): void {
            let context = Kouky.WebGLContext.gl;
            this._shader.source.use();
            this._shader.source.uploadUniform("u_projection", Kouky.EnginePipeline.canvas.projectionMatrix);
            this._shader.source.uploadUniform("u_model", this.transform.getTransformationMatrix());
            this._shader.source.uniformVec4("u_color", this._color.toFloatVector4());
            this._geometry.draw(this._shader.source);
        }
    }
}