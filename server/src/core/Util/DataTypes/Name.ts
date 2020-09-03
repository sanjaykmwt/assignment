import Validator from "../Validator";
import { IDataType } from "./IDataType";


export class Name implements IDataType{

    private name:(string|null)  =   null;
    private validator:(Validator)     =   Validator.instance();

    constructor(name){
        this.name   =   name;
    }

    isValid():boolean{
        return this.validator.isAlphaNumeric(name)
    }

    get(){
        return this.name.trim();
    }
}