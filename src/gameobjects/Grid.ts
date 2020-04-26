namespace Snake {
    export interface GridCollider {
        onCollision(other: GridCollider): void;
        position: Kouky.Vector3;
    }

    export class Grid implements Kouky.EnginePipelineComponent{

        public cellSize: number = 20;
        public gridWidth: number;
        public gridHeight: number;

        private _colliders: any[] = [];

        private _playerController: PlayerController;
        private _playerObjet: PlayerObject;

        public constructor(cellSize: number) {
            this.cellSize = cellSize;
        }
        
        public start(): void {
            Kouky.EventSystem.addListener(
                FoodDieEvent.type,
                this.foodDiedEvent.bind(this)
            );

            this.spawnPlayer();
            this.spawnNewFood();
        }

        public end(): void {
        }

        public updateReady(): void {
        }

        public update(time: Kouky.Timestamp): void {
            this.checkCollision();
        }

        public render(): void {
        }

        public addCollider(col: any):void {
            this._colliders.push(col);
        }

        private checkCollision(): void {
            for(let c of this._colliders) {
                for(let o of this._colliders) {
                    if(o !== c && o.position.equals(c.position)) {
                        Kouky.EventSystem.dispatch(new CollisionEvent(this, o, c), true);
                    } 
                }
            }
        }

        private foodDiedEvent(sender: any, args: FoodDieArguments): boolean {
            for(let i = this._colliders.length; i >= 0; i--) {
                if(this._colliders[i] === sender) {
                    delete this._colliders[i];
                    this._colliders.splice(i, 1);
                    break;
                }
            }
            this.spawnNewFood();
            return true;
        }

        private spawnNewFood(): void {
            let pos = this.getRandomPositionOnGrid();
            console.log(`spawning new food at position ${pos.toString()}`);
            let food = new Food(this.cellSize);
            food.transform.position.copyFrom(pos);
            this.addCollider(food);
            Kouky.EnginePipeline.addComponent(food);
        }

        private spawnPlayer(): void {
            this._playerObjet = new PlayerObject(this.cellSize);
            this._playerController = new PlayerController(this._playerObjet);
            this._playerObjet.transform.position.copyFrom(
                this.getRandomPositionOnGrid()
            );
            this.addCollider(this._playerObjet);
            Kouky.EnginePipeline.addComponent(this._playerController);
            Kouky.EnginePipeline.addComponent(this._playerObjet);
        }

        private getRandomPositionOnGrid(): Kouky.Vector3 {
            let x = Math.getRandomInInterval(-(this.gridWidth/2.0)/ this.cellSize, (this.gridWidth/ 2.0)/ this.cellSize);
            let y = Math.getRandomInInterval(-(this.gridHeight/2.0)/this.cellSize, (this.gridHeight/2.0)/ this.cellSize);
            return new Kouky.Vector3(Math.floor(x) * this.cellSize, Math.floor(y) * this.cellSize, 0);
        }

    }
}