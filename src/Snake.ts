namespace Snake {
    export class Snake {
        private _engine: Kouky.KoukyEngine;
        private _player: PlayerObject;
        private _food: Food;

        public constructor(debug: boolean = false) {
            this._engine = new Kouky.KoukyEngine(undefined, "root", debug);
        }

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