namespace Snake {
    export class Grid implements Kouky.EnginePipelineComponent{

        public cellSize: number = 20;
        public gridWidth: number;
        public gridHeight: number;

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
        }

        public render(): void {
        }
;
    }
}