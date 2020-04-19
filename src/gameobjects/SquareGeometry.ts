namespace Snake {
    export class SquareGeometry {
        private _width: number;
        private _height: number;
        private _vertexBuffer: Kouky.VertexBuffer;
        private _indexBuffer: Kouky.IndexBuffer;

        public constructor(width: number, height: number) {
            this._width = width;
            this._height = height;
            this.init();
        }

        public get width(): number { return this._width; }
        public get height(): number { return this._height; }

        private init(): void {
            const vertexData = new Kouky.VertexBufferData();
            vertexData.addElements([
                new Kouky.Vertex(new Kouky.Vector3(0.0, 0.0, 0.0)),
                new Kouky.Vertex(new Kouky.Vector3(0.0, this._height, 0.0)),
                new Kouky.Vertex(new Kouky.Vector3(this._width, 0.0, 0.0)),
                new Kouky.Vertex(new Kouky.Vector3(this._width, this._height, 0.0))
            ]);
            this._vertexBuffer = new Kouky.VertexBuffer();
            this._vertexBuffer.addDataAndLoad(vertexData);
            
            const indexData = new Kouky.IndexBufferData();
            indexData.addElements([
                new Kouky.Index(0),
                new Kouky.Index(1),
                new Kouky.Index(2),
                new Kouky.Index(2),
                new Kouky.Index(1),
                new Kouky.Index(3)
            ]);
            
            this._indexBuffer = new Kouky.IndexBuffer();
            this._indexBuffer.addDataAndLoad(indexData);
        }

        public draw(shader: Kouky.Shader): void  {
            this._vertexBuffer.bind();
            this._indexBuffer.bind();
            shader.enableVertexAttribute("a_position",3,0, 0);
            Kouky.WebGLContext.gl.drawElements(
                Kouky.WebGLContext.gl.TRIANGLES,
                6, Kouky.WebGLContext.gl.UNSIGNED_SHORT, 
                0
            );
            this._indexBuffer.unbind();
        }
    }
}