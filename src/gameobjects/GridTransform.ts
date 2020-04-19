namespace Snake {
    export class GridTransform {
        private _transform: Kouky.Transform;
        private _offset: number;

        public constructor(gridoffset: number) {
            this._transform = new Kouky.Transform();
            this._offset = gridoffset;
        }

        public get position(): Kouky.Vector3 { return this._transform.position; }
        public set position(value: Kouky.Vector3) {
            this._transform.position.add(value.clone().scale(this._offset));
        }

        public getTransformationMatrix(): Kouky.Matrix4x4 {
            return this._transform.getTransformationMatrix();
        }

        public move(vector: Kouky.Vector3): void {
            this._transform.position = this._transform.position.add(vector.clone().scale(this._offset));
        }
    }
}