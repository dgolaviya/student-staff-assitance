import React from 'react';
import PropTypes from "prop-types";
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import EnrollCourse from '../EnrollCourse';
import LeftMenu from '../LeftMenu';
import EditProfile from '../EditProfile';
import StaffLanding from './StaffLanding';
import { logoutUser } from "../../actions/actions";
import ChangePassword from "../ChangePassword";

const menuItems = [
  {
    title: 'Home',
    icon: 'home',
    color: 'red-text',
    url: '/dashboard'
  },
  {
    title: 'Profile',
    icon: 'edit',
    color: 'green-text',
    url: '/dashboard/profile'
  },
  {
    title: 'ChangePassword',
    icon: 'history',
    color: 'purple-text',
    url: '/dashboard/changePassword'
  },
  {
    title: 'Logout',
    icon: 'exit_to_app',
    color: 'black-text',
    url: ''
  }
];
class StaffDashboard extends React.Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="row dashboard">
        <LeftMenu menuItems={menuItems} user={user}  logoutUser={logoutUser} history={this.props.history} />
        <div className="content col s8 m9 l10">
          <Route exact path="/dashboard" component={StaffLanding} />
          <Route exact path="/dashboard/profile" component={EditProfile} />
          <Route exact path="/dashboard/enroll-course" component={EnrollCourse} />
          <Route exact path="/dashboard/changePassword" component={ChangePassword} />
        </div>
      </div>
    );
  }
};

StaffDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(StaffDashboard);