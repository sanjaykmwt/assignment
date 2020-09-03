import { createStyles} from '@material-ui/core/styles';


export const useStyles =  function(theme){
    const drawerWidth   =  230; 
    const {palette}     =   theme;
    return createStyles({
        root: {
            display: 'flex',
          },
          drawer: {
            [theme.breakpoints.up('lg')]: {
              width: drawerWidth,
              flexShrink: 0,
            },
          },
          listIcon:{
            minWidth:'40px !important'
          },
          toolbar:{
            minHeight:"48px"
          },
          drawerPaper: {
            width: drawerWidth,
            backgroundColor:palette.secondry.main
          },
          content: {
            flexGrow: 1,
            padding: theme.spacing(3),
          },
          menuChild: {
            color:"black",
            paddingLeft: "35%"
          },
          lightList:{
            color:"#ffff",
            backgroundColor:palette.secondry.main,
            "&:hover": {
              backgroundColor: palette.secondry.main
            }
          },
          darkList:{
            color:"#ffff",
            backgroundColor:palette.secondry.main,
            "&:hover": {
              backgroundColor: palette.secondry.main
          }
            // color:"#ffffff"
          },
          darkIcon:{
            color:"#ffffff"
          },
          lightIcon:{
            color: palette.primary.main,
          },
          listText:{
            color:"#ffffff"
          },
          listlightText:{
            color: palette.primary.main,
          },
          listHeaderText:{
            fontSize:'23px',
            color: palette.primary.lightLogo,
            textAlign:"center"
          },
          st_div:{
            background:"#ffff"
          },
         
    });
};


