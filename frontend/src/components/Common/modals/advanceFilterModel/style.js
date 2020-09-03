import {createStyles} from '@material-ui/core/styles';


export const useStyles =  function(theme){

    // const {breakpoints}     =   theme;
    return createStyles({
        paper:{
            paddingRight:0
          },
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            flex: 1,
        },
        toolbar:{
            paddingLeft:"0px",
            paddingRight:"0px"
        },
        formControl: {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            width: "100%",
        },
        
    })
}