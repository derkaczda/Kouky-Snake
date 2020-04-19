namespace Snake {
    export class FlatColorShader {
        private _shader: Kouky.Shader;

        public constructor() {
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
                gl_FragColor = u_color;
            }
            `;
            
            this._shader = new Kouky.Shader(vertexShaderSrc, fragmentShaderSrc);
            this._shader.build();
        }
        
        public get source(): Kouky.Shader { return this._shader; }
    }
}