namespace Snake {
    export class CollisionEventArguments extends Kouky.EventArguments {
        public colliderOne: any;
        public colliderTwo: any;
    }
    export class CollisionEvent extends Kouky.Event {
        public static get type(): string { return "CollisionEvent"; }
        public get type(): string { return "CollisionEvent"; }

        private one: any;
        private two: any;

        protected _arguments: CollisionEventArguments;

        public constructor(sender: any, one: any, two: any) {
            super(sender);
            this.one = one;
            this.two = two;
        }

        protected createArguments(): void { this._arguments = new CollisionEventArguments(); }

        protected fillArguments(): void {
            super.fillArguments();
            this._arguments.colliderOne = this.one;
            this._arguments.colliderTwo = this.two;
        }
    }
}