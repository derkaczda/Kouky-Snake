namespace Snake {
    export class Snake {
        private _engine: Kouky.KoukyEngine;
        private _player: PlayerObject;

        public constructor(debug: boolean = false) {
            this._engine = new Kouky.KoukyEngine(undefined, "root", debug);
        }

        public start(): void {
            this._player = new PlayerObject();
            Kouky.EnginePipeline.addComponent(this._player);

            this._engine.start();
            this._engine.fullscreen();
            this._engine.display.clearColor = new Kouky.Color(0.27, 0.27, 0.27);
        }

        public loop(): void {
            this._engine.loop();
        }

        public resize(): void {
            this._engine.resize();
        }
    }
}