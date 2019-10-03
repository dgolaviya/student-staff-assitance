import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CreateCourse from "../CreateCourse";
import LeftMenu from "../LeftMenu";
import EditProfile from "../EditProfile";
import AdminLanding from "./AdminLanding";
import ApproveEnrollment from "../ApproveEnrollment";
import { logoutUser } from "../../actions/actions";
import ChangePassword from "../ChangePassword";
import DiscussionThread from "../DiscussionThread/DiscussionThread";
import DiscussionChat from "../DiscussionChat/DiscussionChat";
import EditDiscussionThread from "../EditDiscussionThread/EditDiscussionThread";
import ManageUsers from "../ManageUsers";
import CreateUser from "../CreateUser";
import Share from '../Share';

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
    title: "Share",
    icon: "share",
    color: "blue-text",
    url: "/dashboard/share"
  },
  {
    title: "Logout",
    icon: "exit_to_app",
    color: "black-text",
    url: ""
  },
];
class AdminDashboard extends React.Component {
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
        <div className="content col s8 m9 l10">
          <Route exact path="/dashboard" component={AdminLanding} />
          <Route exact path="/dashboard/profile" component={EditProfile} />
          <Route exact path="/dashboard/courses" component={CreateCourse} />
          <Route exact path="/dashboard/create-user" component={CreateUser} />
          <Route exact path="/dashboard/edit-user" render={(props) => <EditProfile {...props} />} />
          <Route
            exact
            path="/dashboard/approve-enrollment"
            component={ApproveEnrollment}
          />
          <Route
            exact
            path="/dashboard/manage-users"
            component={ManageUsers}
          />
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
            path="/dashboard/share"
            component={Share}
          />
          <Route
            exact
            path="/dashboard/discussion-threads/createOrUpdate"
            component={EditDiscussionThread}
          />
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminDashboard);
