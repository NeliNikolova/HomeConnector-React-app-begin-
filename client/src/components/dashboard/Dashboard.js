import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
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
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        if (profile.confirmation === false && profile.isAdmin === false) {
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome, {user.name}! Please wait to confirm your profile!
              </p>
            </div>
          );
        } else {
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome{" "}
                <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                <Link to="/edit-profile" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" /> Edit
                  Profile
                </Link>
                {user.admin ? (
                  <Link to="/admin/dashboard" className="btn btn-light">
                    Admin Panel
                  </Link>
                ) : null}
              </p>
            </div>
          );
        }
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
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

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
