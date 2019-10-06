import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import EnrollCourse from "../EnrollCourse";
import LeftMenu from "../LeftMenu";
import EditProfile from "../EditProfile";
import StaffLanding from "./StaffLanding";
import { logoutUser } from "../../actions/actions";
import ChangePassword from "../ChangePassword";
import EditDiscussionThread from "../EditDiscussionThread/EditDiscussionThread";
import DiscussionThread from "../DiscussionThread/DiscussionThread";
import DiscussionChat from "../DiscussionChat/DiscussionChat";
import Share from "../Share";
import Announcements from "../Announcements/Announcements";
import EditAnnouncement from "../EditAnnouncement/EditAnnouncement";
import News from "../News/News";
import EditNews from "../EditNews/EditNews";
import ActivityLog from "../ActivityLog";
import StudentListView from "../StudentsListView/StudentListView";
import Documents from "../Documents/Documents";
import Header from "../Header";
import Footer from "../Footer";
import ContactUs from "../ContactUs";

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
    title: "ChangePassword",
    icon: "security",
    color: "purple-text",
    url: "/dashboard/changePassword"
  },
  {
    title: "Discussion Threads",
    icon: "chat",
    color: "green-text",
    url: "/dashboard/discussion-threads"
  },
  {
    title: "Share",
    icon: "share",
    color: "blue-text",
    url: "/dashboard/share"
  },
  {
    title: "Articles",
    icon: "book",
    color: "blue-text",
    url: "/dashboard/documents"
  },
  {
    title: "Announcement",
    icon: "announcement",
    color: "green-text",
    url: "/dashboard/announcements"
  },
  {
    title: "News",
    icon: "info",
    color: "green-text",
    url: "/dashboard/news"
  },
  {
    title: "Report",
    icon: "list",
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
class StaffDashboard extends React.Component {
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
        <div className="right-content">
          <div className="content col s12">
            <Header />
            <Route exact path="/dashboard" component={StaffLanding} />
            <Route exact path="/dashboard/profile" component={EditProfile} />
            <Route
              exact
              path="/dashboard/enroll-course"
              component={EnrollCourse}
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
              path="/dashboard/discussion-threads/createOrUpdate"
              component={EditDiscussionThread}
            />
            <Route exact path="/dashboard/share" component={Share} />
            <Route
              exact
              path="/dashboard/discussion-threads/discussion-chats"
              component={DiscussionChat}
            />
            <Route
              exact
              path="/dashboard/announcements"
              component={Announcements}
            />
            <Route
              exact
              path="/dashboard/announcements/createOrUpdate"
              component={EditAnnouncement}
            />
            <Route exact path="/dashboard/news" component={News} />
            <Route
              exact
              path="/dashboard/news/createOrUpdate"
              component={EditNews}
            />
            <Route
              exact
              path="/dashboard/studentsList"
              component={StudentListView}
            />
            <Route exact path="/dashboard/report" component={ActivityLog} />
            <Route exact path="/dashboard/documents" component={Documents} />
            <Route exact path="/dashboard/contact-us" component={ContactUs} />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

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
