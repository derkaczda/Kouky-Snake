namespace Snake {
    export class Square {
        public transform: Kouky.Transform;

        private _size: number;

        public constructor(size: number) {
            this._size = size;
            this.transform = new Kouky.Transform();
            this.transform.scale = new Kouky.Vector3(size, size, 1);
        }

        public render(shader: Kouky.Shader): void {

            shader.uploadUniform("u_model", this.transform.getTransformationMatrix());
            SquareGeometry.instance.draw(shader)
        }
    }
}