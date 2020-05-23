namespace Snake {
    export class Snake {
        private _engine: Kouky.KoukyEngine;
        private _grid: Grid;
        private static _pause: boolean = false;

        public constructor(debug: boolean = false) {
            this._engine = new Kouky.KoukyEngine(undefined, "root", debug);
        }

        public static get pause(): boolean { return Snake._pause; }
        public static set pause(value: boolean) { Snake._pause = value; }

        public start(): void {
            this._grid = new Grid();
            Kouky.EnginePipeline.addComponent(this._grid);

            this._engine.start();
            this._engine.fullscreen();
            this._engine.display.clearColor = Kouky.Color.fromHex("#1b262c");

            Kouky.EventSystem.addListener(Kouky.AssetLoadEvent.type, this.audioLoaded.bind(this));
            Kouky.AssetManager.loadAsset("assets/sounds/sound.mp3");
        }

        public loop(): void {
            this._engine.loop();
        }

        public resize(): void {
            this._engine.resize();
        }

        private audioLoaded(sender: any, args: Kouky.AssetLoadEventArguments) {
            console.log("asset loaded");
            //(args.asset as Kouky.AudioAsset).play();
        }
    }
}