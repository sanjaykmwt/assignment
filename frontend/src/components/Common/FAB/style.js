import { createStyles} from '@material-ui/core/styles';

export const useStyles =  function(theme){

    return createStyles({
     fab : {
      margin: "0px",
      top: "auto",
      right:" 25px",
      bottom: "25px",
      left: "auto",
      position: "fixed",
    },
    });
};
