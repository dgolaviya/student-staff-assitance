import React from 'react';
import PropTypes from "prop-types";
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import EnrollCourse from '../EnrollCourse';
import LeftMenu from '../LeftMenu';
import EditProfile from '../EditProfile';
import StudentLanding from './StudentLanding';
import { logoutUser } from "../../actions/actions";
import ChangePassword from "../ChangePassword";
import DiscussionThread from '../DiscussionThread/DiscussionThread';
import DiscussionChat from '../DiscussionChat/DiscussionChat';
import ActivityLog from '../ActivityLog';
import Documents from '../Documents/Documents';

const menuItems = [
  {
    title: "Home",
    icon: "home",
    color: "red-text",
    url: "/dashboard"
  },
  {
    title: "Profile",
    icon: "edit",
    color: "green-text",
    url: "/dashboard/profile"
  },
  {
    title: "Courses",
    icon: "history",
    color: "purple-text",
    url: "/dashboard/courses"
  },
  {
    title: "Articles",
    icon: "share",
    color: "blue-text",
    url: "/dashboard/documents"
  },
  {
    title: "Discussion Threads",
    icon: "edit",
    color: "green-text",
    url: "/dashboard/discussion-threads"
  },
  {
    title: "ChangePassword",
    icon: "history",
    color: "purple-text",
    url: "/dashboard/changePassword"
  },
  {
    title: "Report",
    icon: "accessibility",
    color: "red-text",
    url: "/dashboard/report"
  },
  {
    title: "Logout",
    icon: "exit_to_app",
    color: "black-text",
    url: ""
  }
];
class StudentDashboard extends React.Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div className="row dashboard">
        <LeftMenu
          menuItems={menuItems}
          user={user}
          logoutUser={logoutUser}
          history={this.props.history}
        />
        <div className="content col s10 m10 l10">
          <Route exact path="/dashboard" component={StudentLanding} />
          <Route exact path="/dashboard/profile" component={EditProfile} />
          <Route exact path="/dashboard/courses" component={EnrollCourse} />
          <Route
            exact
            path="/dashboard/changePassword"
            component={ChangePassword}
          />
          <Route
            exact
            path="/dashboard/discussion-threads"
            component={DiscussionThread}
          />
          <Route
            exact
            path="/dashboard/discussion-threads/discussion-chats"
            component={DiscussionChat}
          />
          <Route
            exact
            path="/dashboard/report"
            component={ActivityLog}
          />
          <Route exact path="/dashboard/documents" component={Documents} />
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
  { logoutUser }
)(StudentDashboard);