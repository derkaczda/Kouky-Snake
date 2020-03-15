import React from 'react';
import Kouky from '../Kouky';
import Vector3 from '../Kouky/math/Vector3';
import ModelRenderer from '../Kouky/Render/ModelRenderer';
import ModelFactory from '../Kouky/Utils/ModelFactory'
import Player from './GameObjects/player';

export default class Snake extends React.Component
{
    constructor()
    {
        super();
    }

    initKouky = () =>
    {
        this.kouky = new Kouky();
        this.kouky.init('kouky_canvas');
        this.clearColor = new Vector3(0.27, 0.27, 0.27);
        this.kouky.setClearColorVec3(this.clearColor);
    }

    gameLoop = () =>
    {
        window.requestAnimationFrame(() => {
            if(!this.running)
                return;
            
            this.kouky.clearColor();

            this.player.render();

            this.gameLoop(); 
        });
    }

    componentDidMount()
    {
        this.initKouky();

        this.running = true;
        
        this.player = new Player();
        this.gameLoop();
    }

    render()
    {
        return (
        <div>
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