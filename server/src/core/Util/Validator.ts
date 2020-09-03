
export default class Validator{
    private static $_instance:(Validator|null)      =   null;

    //Private Constructor
    private constructor(){

    }

    public static instance(){
        if(Validator.$_instance == null){
            Validator.$_instance    =   new Validator()
        }
        return Validator.$_instance;
    }

    public isAlphaNumeric(str:string):boolean{
        if(str == null){
            return false;
        }
        const regRex    =   /^[a-z].[a-z0-9 ]*$/i
        return regRex.test(str);
    }

    public isEmail(str:string):boolean{
        if(str == null){
            return false;
        }
        const regRex    =   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
        return regRex.test(str);
    }

    public isIp(str:string):boolean{
        if(str == null){
            return false;
        }
        const regRex = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i
        return  regRex.test(str);
    }

    public isEnum(str:string):boolean{
        if(str == null){
            return false;
        }
        var enums = ["Country", "State", "City", "Locality"];
        return enums.includes(str);
    }
}