import React from 'react';
import PropTypes from "prop-types";
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import EnrollCourse from '../EnrollCourse';
import LeftMenu from '../LeftMenu';
import EditProfile from '../EditProfile';
import StudentLanding from './StudentLanding';

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
    color: 'red-text',
    url: '/dashboard/profile'
  },
  {
    title: 'Courses',
    icon: 'history',
    color: 'purple-text',
    url: '/dashboard/courses'
  },
  {
    title: 'Logout',
    icon: 'exit_to_app',
    color: 'black-text',
    url: ''
  }
];
class StudentDashboard extends React.Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="row dashboard">
        <LeftMenu menuItems={menuItems} user={user} />
        <div className="content col s8 m9 l10">
          <Route exact path="/dashboard" component={StudentLanding} />
          <Route exact path="/dashboard/profile" component={EditProfile} />
          <Route exact path="/dashboard/courses" component={EnrollCourse} />
        </div>
      </div>
    );
  }
};

StudentDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(StudentDashboard);