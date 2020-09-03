import { createStyles} from '@material-ui/core/styles';


export const useStyles =  function(theme){

    const {breakpoints}     =   theme;

    return createStyles({
       
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      root: {
        display: 'flex',
      },
      login:{
        position:"absolute",
        right: 0
       },
      menuButton: {
        marginRight: theme.spacing(2),
        [breakpoints.up('lg')]: {
          display: 'none',
        },
      },
      toolbar:{
        minHeight:"48px"
      },
      username: {
        fontSize: "12px"
      },
      spacer: {
        flex: '1 1 ',
      },
      typo:{
        cursor:"pointer"
      }
         
    });
};


