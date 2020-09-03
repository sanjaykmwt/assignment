import React from "react";
import { connect } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Switch, Route, Redirect } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import List from "./List";
import Add from "./Add";
import View from "./View";
const styles = (theme) =>
  createStyles({
    "@global": {
      "html,body,#root": {
        margin: 0,
        height: "100%",
      },
    },
  });
class TeacherManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        {/* <Route path={`${this.props.match.path}/home`} component={Home} /> */}
        <Route path={`${this.props.match.path}/list`} component={List} />
        <Route path={`${this.props.match.path}/add`} component={Add} />
        <Route path={`${this.props.match.path}/:id/view`} component={View} />
        <Redirect exact path={`${this.props.match.path}`} to={`${this.props.match.path}/list`} />
      </Switch>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  withWidth()
)(
  connect((state, props) => {
    //State to Prop
    return {};
  }, {})(TeacherManagement)
);
