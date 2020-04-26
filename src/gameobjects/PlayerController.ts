namespace Snake {
    export class PlayerController implements Kouky.EnginePipelineComponent {
        private _player: PlayerObject;
        private _stepSpeed: number = 5;
        private _movementDirection: Kouky.Vector3 = Kouky.Vector3.right();
        private _frameCount: number = 0;
        private _thresholdFrameCount: number;

        public constructor(player: PlayerObject) {
            this._player = player;
        }

        public update(time: Kouky.Timestamp): void {
            if(Kouky.Input.isKeyDown(Kouky.Keys.LEFT)) {
                this._movementDirection = Kouky.Vector3.left();  
            }
            else if(Kouky.Input.isKeyDown(Kouky.Keys.RIGHT)) {
                this._movementDirection = Kouky.Vector3.right();  
            }
            else if(Kouky.Input.isKeyDown(Kouky.Keys.UP)) {
                this._movementDirection = Kouky.Vector3.up();  
            }
            else if(Kouky.Input.isKeyDown(Kouky.Keys.DOWN)) {
                this._movementDirection = Kouky.Vector3.down();  
            }

            if(Kouky.Input.isKeyDown(Kouky.Keys.SPACE)) {
                Snake.pause = !Snake.pause;
            }

            this._thresholdFrameCount = Kouky.Timer.FPS * 0.2;
            if(!Snake.pause) {
                this._frameCount++;
                if(this._frameCount >= this._thresholdFrameCount) {
                    this._player.transform.position.add(this._movementDirection.clone().scale(this._player.width));
                    for(let t of this._player.tail) {
                        t.transform.position.add(this._movementDirection.clone().scale(this._player.width));
                    }
                    this._frameCount = 0.0;
                }
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