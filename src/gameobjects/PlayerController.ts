namespace Snake {
    export class PlayerController implements Kouky.EnginePipelineComponent {
        private _player: PlayerObject;
        private _stepSpeed: number = 10;

        public constructor(player: PlayerObject) {
            this._player = player;
        }

        public update(time: Kouky.Timestamp): void {
            if(Kouky.Input.isKeyDown(Kouky.Keys.LEFT)) {
                this._player.transform.position.x -= this._stepSpeed * time.frameDelta;
                return;
            }
            if(Kouky.Input.isKeyDown(Kouky.Keys.RIGHT)) {
                this._player.transform.position.x += this._stepSpeed * time.frameDelta;
                return;
            }
            if(Kouky.Input.isKeyDown(Kouky.Keys.UP)) {
                this._player.transform.position.y += this._stepSpeed * time.frameDelta;
                return;
            }
            if(Kouky.Input.isKeyDown(Kouky.Keys.DOWN)) {
                this._player.transform.position.y -= this._stepSpeed * time.frameDelta;
                return;
            }
        }
        
        public start(): void {
        }
        public end(): void {
        }
        public updateReady(): void {
        }
        public render(): void {
        }
    }
}