namespace Snake {
    export class Food implements Kouky.EnginePipelineComponent {
        private _vertexBuffer: Kouky.VertexBuffer;
        private _indexBuffer: Kouky.IndexBuffer;
        private _shader: Kouky.Shader;
        private _color: Kouky.Color = new Kouky.Color(138, 36, 30);

        public transform: Kouky.Transform;

        public constructor() {
            this.transform = new Kouky.Transform();
            this.transform.scale.copyFrom(new Kouky.Vector3(20.0, 20.0, 20.0));
        }

        public start(): void {
            this.createGeometry();
            this.createShader();
        }
        public end(): void {
        }
        public updateReady(): void {
        }
        public update(time: Kouky.Timestamp): void {
        }
        public render(): void {
            let context = Kouky.WebGLContext.gl;
            this._shader.use();
            this._shader.uploadUniform("u_projection", Kouky.EnginePipeline.canvas.projectionMatrix);
            this._shader.uploadUniform("u_model", this.transform.getTransformationMatrix());
            this._shader.uniformVec4("u_color", this._color.toFloatVector4());
            this._vertexBuffer.bind();
            this._shader.enableVertexAttribute("a_position", 3, 0, 0);
            this._indexBuffer.bind();
            context.drawElements(context.TRIANGLES, 6 , context.UNSIGNED_SHORT, 0);
        }
        
        private createGeometry(): void {
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

        private createShader(): void {
            const vertexShaderSrc = `
            attribute vec3 a_position;

            uniform mat4 u_projection;
            uniform mat4 u_model;
           
            void main(void)
            {
                gl_Position = vec4(a_position, 1.0) * u_model * u_projection;
            }
            `;
            
            const fragmentShaderSrc = `
            precision mediump float;
            uniform vec4 u_color;
            void main(void)
            {
                gl_FragColor = u_color; //vec4(138.0/255.0, 36/255.0, 30.0/255.0, 1.0);
            }
            `;
            
            this._shader = new Kouky.Shader(vertexShaderSrc, fragmentShaderSrc);
            this._shader.build();
        }
    }
}