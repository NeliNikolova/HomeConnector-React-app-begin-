import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCurrentProfile,
  getAllProfilesNotConfirm,
  getConfirmation
} from "../../actions/profileActions";
class AdminRoute extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getAllProfilesNotConfirm();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
    }
  }
  render() {
    const { component: Component, auth, ...rest } = this.props;
    const { profile } = this.props.profile;

    return (
      <Route
        {...rest}
        render={props => {
          return auth.isAuthenticated === true && auth.user.admin === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/dashboard" />
          );
        }}
      />
    );
  }
}
AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, getAllProfilesNotConfirm, getConfirmation }
)(AdminRoute);
