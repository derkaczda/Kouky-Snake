namespace Snake {
    export class PlayerObject implements Kouky.EnginePipelineComponent {

        private _color: Kouky.Color = Kouky.Color.fromHex("#ffa372");
        private _geometry: SquareGeometry;
        private _shader: FlatColorShader;

        public transform: Kouky.Transform;

        public get width(): number { return this._geometry.width; }
        public get height(): number { return this._geometry.height; }

        private testEventId: number;
        private collisionEventId: number;

        public constructor(size: number) {
            this._geometry = new SquareGeometry(size, size);
            this.transform = new Kouky.Transform();//new GridTransform(this._geometry.width);
            this._shader = new FlatColorShader();

        }
        public get position(): Kouky.Vector3 { return this.transform.position;}
        
        public start(): void {
            this.collisionEventId = Kouky.EventSystem.addListener(CollisionEvent.type, this.onCollisionEvent.bind(this));
        }
        public end(): void {
            Kouky.EventSystem.removeListener(this.testEventId);
        }
        public updateReady(): void {
        }
        public update(time: Kouky.Timestamp): void {
        }
        public render(): void {
            this._shader.source.use();
            this._shader.source.uploadUniform("u_projection", Kouky.EnginePipeline.canvas.projectionMatrix);
            this._shader.source.uploadUniform("u_model", this.transform.getTransformationMatrix());
            this._shader.source.uniformVec4("u_color", this._color.toFloatVector4());
            this._geometry.draw(this._shader.source);
        }

        private onCollisionEvent(sender: any, args: CollisionEventArguments): boolean {
            return false;
        }
    }
}