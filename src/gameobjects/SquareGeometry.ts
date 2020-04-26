namespace Snake {
    export class SquareGeometry {
        private _width: number;
        private _height: number;
        private _vertexBuffer: Kouky.VertexBuffer;
        private _indexBuffer: Kouky.IndexBuffer;

        private static _instance: SquareGeometry;
        
        public static get instance(): SquareGeometry {
            if(SquareGeometry._instance === undefined)
                SquareGeometry._instance = new SquareGeometry();
            return SquareGeometry._instance;
        }

        public constructor() {
            this.init();
        }

        public get width(): number { return this._width; }
        public get height(): number { return this._height; }

        private init(): void {
            const vertexData = new Kouky.VertexBufferData();
            vertexData.addElements([
                new Kouky.Vertex(new Kouky.Vector3(0.0, 0.0, 0.0)),
                new Kouky.Vertex(new Kouky.Vector3(0.0, 1.0, 0.0)),
                new Kouky.Vertex(new Kouky.Vector3(1.0, 0.0, 0.0)),
                new Kouky.Vertex(new Kouky.Vector3(1.0, 1.0, 0.0))
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