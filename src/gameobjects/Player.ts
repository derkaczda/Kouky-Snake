namespace Snake {
    export class Player {

        private _color: Kouky.Color = Kouky.Color.fromHex("#ffa372");

        public head: Square;
        private tail: Square[] = [];

        private collisionEventId: number;
        private keyEventId: number;

        private size: number;

        public get position(): Kouky.Vector3 { return this.head.transform.position;}

        private _movementDirection: Kouky.Vector3 = Kouky.Vector3.right();

        private appendNewElement = false;

        public constructor(size: number) {
            this.size = size;
            this.head = new Square(size);
            this.collisionEventId = Kouky.EventSystem.addListener(CollisionEvent.type, this.onCollisionEvent.bind(this));
            this.keyEventId = Kouky.EventSystem.addListener(Kouky.KeyDownEvent.type, this.onKeyDownEvent.bind(this));
        }

        public end(): void {
            Kouky.EventSystem.removeListener(this.collisionEventId);
            Kouky.EventSystem.removeListener(this.keyEventId);
        }

        public update(time: Kouky.Timestamp): void {
            let headprev = this.head.transform.position.clone();
            this.head.transform.position.add(this._movementDirection.clone().scale(this.size));
            if(this.appendNewElement) {
                this.appendNewElement = false;
                this.appendToTail();
            }
            if(this.tail.length === 0)
                return;
            for(let i = this.tail.length - 1; i >= 0; i--) {
                let newPos: Kouky.Vector3 = i === 0 ? headprev : this.tail[i-1].transform.position;
                this.tail[i].transform.position.copyFrom(newPos);
            }
            
        }

        public render(shader: Kouky.Shader): void {
            shader.uniformVec4("u_color", this._color.toFloatVector4());
            this.head.render(shader);
            for(let t of this.tail) {
                t.render(shader);
            }
        }

        private onCollisionEvent(sender: any, args: CollisionEventArguments): boolean {
            this.appendNewElement = true;
            return false;
        }

        private onKeyDownEvent(sender: any, args: Kouky.KeyEventArguments): boolean {
            if(args.key === Kouky.Keys.LEFT) {
                this._movementDirection = Kouky.Vector3.left();  
            }
            else if(args.key === Kouky.Keys.RIGHT) {
                this._movementDirection = Kouky.Vector3.right();  
            }
            else if(args.key === Kouky.Keys.UP) {
                this._movementDirection = Kouky.Vector3.up();  
            }
            else if(args.key === Kouky.Keys.DOWN) {
                this._movementDirection = Kouky.Vector3.down();  
            }
            if(args.key === Kouky.Keys.SPACE) {
                Snake.pause = !Snake.pause;
            }
            return true;
        }

        private appendToTail(): void {
            let newTail = new Square(this.size);
            newTail.transform.position = this.position.clone().subtract(
                new Kouky.Vector3((this.tail.length + 1) * 20, 0, 0)
            )
            this.tail.push(newTail);
        }
    }
}