import Validator from "../Validator";
import { IDataType } from "./IDataType";


export class Enum implements IDataType{

    private name:(string|null)  =   null;
    private validator:(Validator)     =   Validator.instance();

    constructor(name){
        this.name   =   name;
    }

    isValid():boolean{
        return this.validator.isEnum(this.name)
    }

    get(){
        return this.name.trim();
    }
}