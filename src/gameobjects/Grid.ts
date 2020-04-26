namespace Snake {
    export interface GridCollider {
        onCollision(other: GridCollider): void;
        position: Kouky.Vector3;
    }

    export class Grid implements Kouky.EnginePipelineComponent{

        private cellSizeConstant: number = 20;
        private cellSize: number;
        private gridWidth: number;
        private gridHeight: number;

        private _player: Player;

        private _foods: Food[] = [];

        private _shader: FlatColorShader;

        private _frameCount: number = 0;
        private _thresholdFrameCount: number;

        public constructor() {
        }
        
        public resize(): void {
            this.gridWidth = Kouky.EnginePipeline.canvas.width;
            this.gridHeight = Kouky.EnginePipeline.canvas.height;
            this.cellSize = this.cellSizeConstant * (this.gridWidth/this.gridWidth);
        }
        
        public start(): void {
            this.resize();
            Kouky.EventSystem.addListener(
                FoodDieEvent.type,
                this.foodDiedEvent.bind(this)
            );

            this._shader = new FlatColorShader();

            this.spawnPlayer();
            this.spawnNewFood();
        }

        public end(): void {
        }

        public updateReady(): void {
        }

        public update(time: Kouky.Timestamp): void {
            this._thresholdFrameCount = Kouky.Timer.FPS * 0.2;
            if(!Snake.pause) {
                this._frameCount++;
                if(this._frameCount >= this._thresholdFrameCount) {
                    this._player.update(time);
                    for(let f of this._foods) {
                        f.update(time);
                    }
                    this.checkCollision();
                    this._frameCount = 0.0;
                }
            }
        }

        public render(): void {
            this._shader.source.use();
            this._shader.source.uploadUniform("u_projection", Kouky.EnginePipeline.canvas.projectionMatrix);
            
            this._player.render(this._shader.source);

            for(let f of this._foods) {
                f.render(this._shader.source);
            }
        }

        private checkCollision(): void {
            for(let f of this._foods) {
                if(f.position.equals(this._player.position)) {
                    Kouky.EventSystem.dispatch(new CollisionEvent(this, f, this._player), true);
                    return;
                }         
            }
        }

        private foodDiedEvent(sender: any, args: FoodDieArguments): boolean {
            for(let i = this._foods.length; i >= 0; i--) {
                if(this._foods[i] === sender) {
                    delete this._foods[i];
                    this._foods.splice(i, 1);
                    break;
                }
            }
            this.spawnNewFood();
            return true;
        }

        private spawnNewFood(): void {
            let pos = this.getRandomPositionOnGrid();
            let food = new Food(this.cellSize);
            food.position.copyFrom(pos);
            this._foods.push(food);
        }

        private spawnPlayer(): void {
            this._player = new Player(this.cellSize);
            this._player.position.copyFrom(
                this.getRandomPositionOnGrid()
            );
        }

        private getRandomPositionOnGrid(): Kouky.Vector3 {
            let x = Math.getRandomInInterval(-(this.gridWidth/2.0)/ this.cellSize, (this.gridWidth/ 2.0)/ this.cellSize);
            let y = Math.getRandomInInterval(-(this.gridHeight/2.0)/this.cellSize, (this.gridHeight/2.0)/ this.cellSize);
            return new Kouky.Vector3(Math.floor(x) * this.cellSize, Math.floor(y) * this.cellSize, 0);
        }

    }
}