/*
 |  File authstore.js is used to validate the application.
 |
 */
import * as Environment from "./enviorment"

//Method is used to check the authentication of the user
export function authLogin(){
    var accessToken   =   window.localStorage.getItem(Environment.app_name()+".accessToken",null)
    var user_email   =   window.localStorage.getItem(Environment.app_name()+".user_email",null)
    var tokenType   =   window.localStorage.getItem(Environment.app_name()+".tokenType",null)
    var data = {
        'accessToken':accessToken,
        'user_email':user_email,
        'tokenType':tokenType
    }
    return data;
}