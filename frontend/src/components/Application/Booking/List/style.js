import {fade, createStyles} from '@material-ui/core/styles';


export const useStyles =  function(theme){
    const {palette}     =   theme;
    return createStyles({
        root: {
          width: '100%',
          padding: "15px",
          overflowX: 'hidden',
        },
        card: {
          marginBottom: "3%",
          cursor: "pointer"
          },
        icon_div: {
          margin:"0px 20px 20px 0",
          display:"flex"
        },
        nimg:{
          width:"30%"
        },
        notImg:{
          textAlign:"center"
        }
    })
      
};


