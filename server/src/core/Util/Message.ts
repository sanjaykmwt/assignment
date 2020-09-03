export enum MessageCode{
    SUCCESS=200,
    SUCCESS_CREATED=201,
    INVALID_PARAM=400,
    UNAUTHORIZED=401,
    NOT_FOUND=404,
    ALREADY_EXISTS=409,
    INTERNAL_ERROR=500
}

export default class Message{
    
    private code:MessageCode    =   null;
    private message:string    =   null;
    private data:any    =   null;

    constructor(code:MessageCode,message:string,data:any=null){
        this.code    =  code;
        this.message    =   message;
        this.data   =   data;
    }

    public getStatusCode():(MessageCode|number){
        return this.code;
    }

    public getJson():any{
        return {
            code:this.code,
            message:this.message,
            data:this.data
        };
    }

    public getData():any{
        return this.data;
    }

    public getMessage():string{
        return this.message;
    }

}