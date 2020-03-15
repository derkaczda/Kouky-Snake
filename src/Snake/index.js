import React from 'react';
import Kouky from '../Kouky';
import Vector3 from '../Kouky/math/Vector3';
import ModelRenderer from '../Kouky/Render/ModelRenderer';
import ModelFactory from '../Kouky/Utils/ModelFactory'

export default class Snake extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            xValue : 0
        }
    }

    initKouky = () =>
    {
        this.kouky = new Kouky();
        this.kouky.init('kouky_canvas');
        this.clearColor = new Vector3(0.3, 0.3, 0.3);
        this.colorValue = 0.01;
    }

    gameLoop = () =>
    {
        window.requestAnimationFrame(() => {
            if(!this.running)
                return;
            
            
            if(this.clearColor.x() >= 1.0 || this.clearColor.x() <= 0.0)
                this.colorValue = -this.colorValue;

            this.color = new Vector3(this.clearColor.x() + this.colorValue,
                                this.clearColor.y() + this.colorValue,
                                this.clearColor.z() + this.colorValue);
            this.clearColor = this.color;
            this.setState({ xValue: this.clearColor.x() });
            this.kouky.setClearColorVec3(this.clearColor);
            this.kouky.clearColor();

            this.modelRenderer.render();

            this.gameLoop(); 
        });
    }

    componentDidMount()
    {
        this.initKouky();

        this.running = true;
        
        const modelRenderer = new ModelRenderer();
        modelRenderer.registerNewModel(ModelFactory.createSquareModel(), 'triangle');
        modelRenderer.addInstance('instance1', 'triangle');
        this.modelRenderer = modelRenderer;

        this.gameLoop();
    }

    render()
    {
        return (
        <div>
            <div>
                <p>{this.state.xValue}</p>
            </div>
            <canvas
                id = "kouky_canvas"
                width = {this.props.width}
                height = {this.props.height}
                style = {{border: '1px solid black'}}>
            </canvas>
        </div>
        );
    }
}