import ModelRenderer from "../../Kouky/Render/ModelRenderer";
import ShaderFactory from "../../Kouky/Utils/ShaderFactory";
import ModelFactory from "../../Kouky/Utils/ModelFactory";
import Vector3 from "../../Kouky/math/Vector3";
import ModelInstance from '../../Kouky/Models/ModelInstance';
import { vec4 } from "gl-matrix";

export default class Player
{
    constructor()
    {
        this.shader = ShaderFactory.createFlatColorShader()
        this.position = new Vector3(0.0, 0.0, 0.0);
        this.shader.changeColor(0.88, 0.67, 0.07, 1.0);

        this.renderer = new ModelRenderer();
        this.renderer.addShader(this.shader);
        this.renderer.registerNewModel(ModelFactory.createSquareModel(), 'square');
        const instance = new ModelInstance(0, 0, 0, 0, 0, 0, 1.0);
        this.instance = instance
        this.renderer.addInstance(instance, 'square');
    }

    setPosition = (position) => this.position = position;

    update = () =>
    {
        this.instance.setPosition(this.position);
        this.instance.updateRotation(1, 1, 1);
    }

    render = () =>
    {
        this.renderer.render();
    }
}