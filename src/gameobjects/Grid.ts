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

        public constructor(cellSize: number) {
            this.cellSize = cellSize;
        }
        
        public start(): void {
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

    }
}