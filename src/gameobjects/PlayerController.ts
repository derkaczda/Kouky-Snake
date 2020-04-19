namespace Snake {
    export class PlayerController implements Kouky.EnginePipelineComponent {
        private _player: PlayerObject;
        private _stepSpeed: number = 5;
        private _movementDirection: Kouky.Vector3 = Kouky.Vector3.right();

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

            if(!Snake.pause) {
                this._player.transform.position = this._player.transform.position.add(this._movementDirection.clone().scale(this._stepSpeed));
                console.log(this._player.transform.position.toString());
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