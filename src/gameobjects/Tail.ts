namespace Snake {
    export class Tail {
        private _geometry: SquareGeometry;

        public transform: Kouky.Transform;

        public constructor(size: number) {
            this._geometry = new SquareGeometry(size, size);
            this.transform = new Kouky.Transform();
        }

        public render(shader: FlatColorShader): void {
            shader.source.uploadUniform("u_model", this.transform.getTransformationMatrix());
            //shader.source.uniformVec4("u_color", this._color.toFloatVector4());
            this._geometry.draw(shader.source);
        }
    }
}