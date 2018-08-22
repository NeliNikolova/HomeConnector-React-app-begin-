class AdminRoute extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    const { component: Component, auth, ...rest } = this.props;
    const { profile } = this.props.profile;
    console.log(profile.isAdmin);
    return (
      <Route
        {...rest}
        render={props => {
          return profile.isAdmin === true ? (
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
  { getCurrentProfile }
)(AdminRoute);
