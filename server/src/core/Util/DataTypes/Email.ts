import Validator from "../Validator";
import { IDataType } from "./IDataType";


export class Email implements IDataType{

    private value:(string|null)  =   null;
    private validator:(Validator)     =   Validator.instance();

    constructor(value){
        this.value   =   value;
    }

    isValid(): boolean {
        return this.validator.isEmail(this.value);
    }

    get(){
        return this.value.trim().toLowerCase();
    }
}