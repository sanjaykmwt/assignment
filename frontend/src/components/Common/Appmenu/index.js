import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemIcon from '../../Common/ListItemIcon/index'
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import { useStyles } from "./style";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from 'react-redux';
import {FaceOutlined, MultilineChartOutlined, SupervisorAccountOutlined ,PersonOutline,ReportOutlined, PowerSettingsNewOutlined} from '@material-ui/icons';
import DialogAction from "../../../store/actions/dialog";
class Appmenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            setOpen: false,
            devices: false,
            bikes: false,
            sales: false,
            customers: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.hideDrawer = this.hideDrawer.bind(this);

    }
    componentWillMount() {
    }
    handleClick() {
        this.setState({ setOpen: !this.state.setOpen })
    }
    hideDrawer() {
        var width = this.props.width;
        if (width === 'xs' || width === 'sm' || width === 'md') {
            this.props.handleDrawer()
            return;
        }
        else return;

    }

       
    
    render() {
        var parent = false;
        var user = false;
        var home = false;
        var teacher = false;
        var report = false;
        var logout = false;

        var path = window.location.href;
        if (path.indexOf("/app/booking") !== -1) {
            home = true;
        }
        else if (path.indexOf("/app/parent") !== -1) {
            parent = true;
        } 
        else if (path.indexOf("/app/user") !== -1) {
            user = true;
        } 
        else if (path.indexOf("/app/report") !== -1) {
            report = true;
        } 
        else if (path.indexOf("/app/teacher") !== -1) {
            teacher = true;
        } 
        const classes = this.props.classes;
        const drawer = (
            <div style={{ color: "#4b4dc6", fontWeight: 600 }}>
                <List className={classes.listHeaderText}>
                    Booking
                </List>
                <Divider className={classes.st_div}/>
                <List dense>
                    <ListItem button className={home === false ? classes.lightList : classes.darkList} onClick={() => {
                        this.props.history.push('/app/booking/list')
                        this.hideDrawer()
                    }}>
                        <ListItemIcon className={classes.listIcon}>
                            <MultilineChartOutlined className={home===false?classes.darkIcon:classes.lightIcon} />
                        </ListItemIcon>
                        <ListItemText primary="Booking" className={home===false?classes.listText:classes.listlightText} />
                    </ListItem>
                </List>
            </div>
        );
        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <nav className={classes.drawer} aria-label="Mailbox folders">
                        <Hidden lgUp implementation="css">
                            <Drawer
                                variant="temporary"
                                open={this.props.showDrawer}
                                onClose={this.props.handleDrawer}

                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden mdDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                </div>
            </Fragment>
        );
    }
}

export default compose(withRouter,withStyles(useStyles), withWidth())(connect((state, props) => {
    return {
    };
  }, {
    showConfirm:DialogAction.showConfirm,
    hideConfirm:DialogAction.hideConfirm,
  })(Appmenu))
