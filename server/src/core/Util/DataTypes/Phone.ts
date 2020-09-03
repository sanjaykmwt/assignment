import Validator from "../Validator";
import { NullValueError } from "../Errors";


export class Phone{

    private phone:(string|null)  =   null;
    private validator:(Validator)     =   Validator.instance();

    constructor(phone){
        this.phone   =   phone;
    }

    isValid():boolean{
        return true;
    }
    
    get(){
        return this.phone.trim();
    }
}