import Validator from "../Validator";
import { IDataType } from "./IDataType";


export class Ip implements IDataType{ 

    private ip:(string|null)  =   null;
    private validator:(Validator)     =   Validator.instance();

    constructor(ip:string){
        this.ip   =   ip;
    }

    isValid():boolean{
        return this.validator.isIp(this.ip);
    }
    get(){
        return this.ip.trim().toLowerCase();
    }
}