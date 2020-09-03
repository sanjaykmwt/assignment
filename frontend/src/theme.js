import { createMuiTheme } from '@material-ui/core/styles';

const primary_theme     =   {
    'palette':{
        'primary':{
            'main':'#50C4F2',
            'lightLogo':"#FFC95F"
        },
        'secondry':{
            'main':"#11245A"
        }
    },
    'spacing': 8
}
export default  function(type){
    var theme     = null;
    switch(type){
        case "Primary":
            theme   =   primary_theme;
            break;
        default:
            theme   =   primary_theme;
            break;
    }
    return createMuiTheme(theme);
};