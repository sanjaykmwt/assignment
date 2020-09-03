//External Import
import * as bcrypt from "bcrypt";
//Internal Import
const saltRounds = 10;

export enum PasswordPolicy{
    POLICY_MIN_8,
    POLICY_MIN_8_ONE_CHAR_ONE_NUMBER,
    POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC,
    POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER,
    POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC,
}

const DEFAULT_POLICY    =   PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER;

export class Password{
    private password:(string|null)  = null;

    constructor(password:string,policy:PasswordPolicy=PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER){
        this.password  =   password;
    }

    public isValid():boolean{
        return this.isValidPassword(DEFAULT_POLICY);
    }

    public policyType():string{
        return this.getPolicyToString(DEFAULT_POLICY);
    }

    public get():(string){
        return this.password;
    }

    private isValidPassword(policy:PasswordPolicy):(boolean){
        var reg_ex       =      /^[a-zA-Z0-9]{8,}$/;
        if(policy == PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER){
            reg_ex  =   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        } else if(policy == PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC){
            reg_ex  =   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        } else if(policy == PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER){
            reg_ex  =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        } else if(policy == PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC){
            reg_ex  =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        }
        return reg_ex.test((this.password));
    }

    public hash():string{
        return bcrypt.hashSync(this.password,saltRounds);
    }

    public checkWithHash(hashString:string):boolean{
        return bcrypt.compareSync(this.password,hashString);
    }

    private getPolicyToString(policy:PasswordPolicy):(string|null){
        switch(policy){
            case PasswordPolicy.POLICY_MIN_8:
                return "minimum of 8 characters";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER:
                return "minimum of 8 characters with atleast 1 character & 1 number";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_CHAR_ONE_NUMBER_ONE_SPEC:
                return "minimum of 8 characters with atleast 1 character,1 number & one special chracter";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER:
                return "minimum of 8 characters with atleast 1 lowercase character,1 uppper character & 1 number";
                break;
            case PasswordPolicy.POLICY_MIN_8_ONE_UP_CHAR_ONE_LOW_CHAR_ONE_NUMBER_ONE_SPEC:
                return "minimum of 8 characters with atleast 1 lowercase character,1 uppper character ,1 number & one special chracter";
                break;
            default:
                return null;
        }
    }
}