namespace Snake {
    export class Food implements Kouky.EnginePipelineComponent {
        private _shader: FlatColorShader;
        private _color: Kouky.Color = Kouky.Color.fromHex("#ed6663");
        private _colorTwo: Kouky.Color = Kouky.Color.fromHex("#0f4c81");
        private _geometry: SquareGeometry;
        public transform: Kouky.Transform;
        private _dead: boolean = false;

        private collisionEventId: number;

        public constructor(size: number) {
            this._geometry = new SquareGeometry(size, size);
            this.transform = new Kouky.Transform();
            this._shader = new FlatColorShader();
        }

        public get position(): Kouky.Vector3 { return this.transform.position;}

        public start(): void {
            this.collisionEventId = Kouky.EventSystem.addListener(
                CollisionEvent.type,
                this.onCollsion.bind(this)
            );
        }
        public end(): void {
        }
        public updateReady(): void {
        }
        public update(time: Kouky.Timestamp): void {
        }

        public render(): void {
            if(this._dead)
                return;
            this._shader.source.use();
            this._shader.source.uploadUniform("u_projection", Kouky.EnginePipeline.canvas.projectionMatrix);
            this._shader.source.uploadUniform("u_model", this.transform.getTransformationMatrix());
            this._shader.source.uniformVec4("u_color", this._color.toFloatVector4());
            this._shader.source.uniformVec4("u_color", this._color.toFloatVector4());
            this._geometry.draw(this._shader.source)
        }

        private die(): void {
            if(!this._dead) {
                this._dead = true;
                Kouky.EventSystem.dispatch(new FoodDieEvent(this));
                Kouky.EventSystem.removeListener(this.collisionEventId);
            }
        }
        
        private onCollsion(sender: any, arg: CollisionEventArguments): boolean {
            this.die();
            return false;
        }
    }
}