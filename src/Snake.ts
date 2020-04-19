namespace Snake {
    export class Snake {
        private _engine: Kouky.KoukyEngine;
        private _player: PlayerObject;
        private _food: Food;
        private static _pause: boolean = true;

        public constructor(debug: boolean = false) {
            this._engine = new Kouky.KoukyEngine(undefined, "root", debug);
        }

        public static get pause(): boolean { return Snake._pause; }
        public static set pause(value: boolean) { Snake._pause = value; }

        public start(): void {
            this._player = new PlayerObject();
            this._food = new Food();
            this._food.transform.position.copyFrom(new Kouky.Vector3(30, 0, 0));
            Kouky.EnginePipeline.addComponent(this._player);
            Kouky.EnginePipeline.addComponent(this._food);
            Kouky.EnginePipeline.addComponent(new PlayerController(this._player));

            this._engine.start();
            this._engine.fullscreen();
            this._engine.display.clearColor = Kouky.Color.fromHex("#1b262c");
        }

        public loop(): void {
            this._engine.loop();
        }

        public resize(): void {
            this._engine.resize();
        }
    }
}