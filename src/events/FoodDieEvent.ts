namespace Snake {
    export class FoodDieArguments extends Kouky.EventArguments {

    }
    export class FoodDieEvent extends Kouky.Event {
        public static get type(): string { return "FoodDieEvent"; }
        public get type(): string { return "FoodDieEvent"; }

        public constructor(sender: any) {
            super(sender);
        }

        protected createArguments(): void { this._arguments = new FoodDieArguments(); }

        protected fillArguments(): void {
            super.fillArguments();
        }
    }
}