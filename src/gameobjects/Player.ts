namespace Snake {
    export class PlayerObject implements Kouky.EnginePipelineComponent {
        private _vertexBuffer: Kouky.VertexBuffer;
        private _indexBuffer: Kouky.IndexBuffer;
        private _shader: Kouky.Shader;

        public transform: Kouky.Transform;


        public start(): void {
            this.createGeometry();
            this.createShader();
            this.transform = new Kouky.Transform();
            this.transform.scale.copyFrom(new Kouky.Vector3(20.0, 20.0, 20.0));
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
            this._vertexBuffer.bind();
            this._shader.enableVertexAttribute("a_position");
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
                gl_Position = u_projection * u_model * vec4(a_position, 1.0);
            }
            `;
            
            const fragmentShaderSrc = `
            void main(void)
            {
                gl_FragColor = vec4(0.88, 0.67, 0.07, 1.0);
            }
            `;
            
            this._shader = new Kouky.Shader(vertexShaderSrc, fragmentShaderSrc);
            this._shader.build();
        }
    }
}