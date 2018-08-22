import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  getAllProfilesNotConfirm,
  getConfirmation
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAllProfilesNotConfirm();
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
    }
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { profile, profiles, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (profiles !== null && profiles.length > 0) {
        dashboardContent = profiles.map((prof, i) => (
          <div className="mb-3" key={i} data-id={prof.user._id}>
            {prof.user.name}
            <button
              onClick={this.props.getConfirmation.bind(
                this,
                prof.user._id,
                this.props.history
              )}
              className="danger"
            >
              Confirm Profile
            </button>
          </div>
        ));
      } else {
        dashboardContent = <p>No profiles to confirm</p>;
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getConfirmation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, getAllProfilesNotConfirm, getConfirmation }
)(AdminDashboard);
