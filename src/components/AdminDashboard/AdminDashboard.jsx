import React from 'react';
import { Card, Row, Col, Icon } from 'react-materialize';
import PropTypes from "prop-types";
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import CreateCourse from '../CreateCourse';
import LeftMenu from '../LeftMenu';
import EditProfile from '../EditProfile';

const menuItems = [
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
    title: 'Staff',
    icon: 'collections',
    color: 'green-text',
    url: '/dashboard/staff'
  },
  {
    title: 'Student',
    icon: 'web',
    color: 'blue-text',
    url: '/dashboard/student'
  },
  {
    title: 'Logout',
    icon: 'exit_to_app',
    color: 'black-text',
    url: ''
  }
];
class AdminDashboard extends React.Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="row dashboard">
        <LeftMenu menuItems={menuItems} user={user} />
        <div className="content col s8 m9 l10">
          <Route exact path="/dashboard/profile" component={EditProfile} />
          <Route exact path="/dashboard/courses" component={CreateCourse} />
        </div>
      </div>
    );
  }
};

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(AdminDashboard);