import React from 'react';
import Kouky from '../Kouky';
import Vector3 from '../Kouky/math/Vector3';
import ModelRenderer from '../Kouky/Render/ModelRenderer';
import ModelFactory from '../Kouky/Utils/ModelFactory'
import Player from './GameObjects/player';
import KoukyEngine from '../Kouky/src/Engine'

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
            
            this.gameObjects.forEach(gameObject => { gameObject.update(); });
            this.kouky.clearColor();
            this.gameObjects.forEach(gameObject => { gameObject.render(); })

            this.gameLoop(); 
        });
    }

    componentDidMount()
    {
        this.initKouky();

        this.running = true;
        this.gameObjects = [];
        
        this.player = new Player();
        this.player2 = new Player();
        this.player2.setPosition(new Vector3(1.0, 0.0, 0.0));
        this.gameObjects.push(this.player);
        this.gameObjects.push(this.player2);
        this.gameLoop();
    }

    render()
    {
        /*return (
        <div>
            <canvas
                id = "kouky_canvas"
                width = {this.props.width}
                height = {this.props.height}
                style = {{border: '1px solid black'}}>
            </canvas>
        </div>
        );*/
        this.kouky = new KoukyEngine();
        return (
            <div></div>
        );
    }
}