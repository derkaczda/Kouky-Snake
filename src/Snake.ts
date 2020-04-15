namespace Snake {
    export class Snake {
        private _engine: Kouky.KoukyEngine;

        public constructor(debug: boolean = false) {
            this._engine = new Kouky.KoukyEngine(undefined, "root", debug);
        }

        public start(): void {
            this._engine.start();
            this._engine.fullscreen();
        }

        public loop(): void {
            this._engine.loop();
        }
    }
}