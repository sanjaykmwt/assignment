import env from "./../env.json";

export function get(key,default_value){
    if(default_value === undefined){
        default_value   =   null;
    }

    if(key === undefined || key === null){
        return default_value;    
    }

    key     =   key+"";

    var key_segment     =   key.split(".");
    var value   =   env;
    for(var i=0;i<key_segment.length;i++){
        var segment_name    =   key_segment[i];
        if(value[segment_name] === undefined){
            return default_value;
        } else {
            value   =   value[segment_name];
        }
    }
    return value;
}

export function host(){
    return get('HOST');
}

export function api_host(){
    return get('API_SERVER');
}

export function debug(){
    if(get('ENV') === 'local'){
        return true;
    } else {
        return false;
    }
}

export function getAppDateFormat(type){
    return get('DATE_FORMAT.'+type);
}

export function app_name(){
    return get('APP_NAME');
}