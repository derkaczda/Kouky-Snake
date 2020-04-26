namespace Snake {
    export class Food {
        private _color: Kouky.Color = Kouky.Color.fromHex("#ed6663");
        private _colorTwo: Kouky.Color = Kouky.Color.fromHex("#0f4c81");
        private _geometry: Square;
        private _dead: boolean = false;

        private collisionEventId: number;

        public constructor(size: number) {
            this._geometry = new Square(size);
            this.collisionEventId = Kouky.EventSystem.addListener(
                CollisionEvent.type,
                this.onCollsion.bind(this)
            );
        }

        public get position(): Kouky.Vector3 { return this._geometry.transform.position;}

        public update(time: Kouky.Timestamp): void {
        }

        public render(shader: Kouky.Shader): void {
            if(this._dead)
                return;
            shader.uniformVec4("u_color", this._color.toFloatVector4());
            this._geometry.render(shader);
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