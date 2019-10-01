import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import { logoutUser } from "../../actions/actions";
import MenuItem from '../MenuItem/MenuItem';
import StudentDashboard from '../StudentDashboard';
import AdminDashboard from '../AdminDashboard';
import StaffDashboard from '../StaffDashboard';
import EditProfile from '../EditProfile';
import './styles.scss';

const menuItems = [
  {
    title: 'Profile',
    icon: 'edit',
    color: 'red-text',
    url: '/dashboard/profile'
  },
  {
    title: 'Admin',
    icon: 'history',
    color: 'purple-text',
    url: '/dashboard/admin'
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
    color: 'black-text'
  }
];

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 'Profile'
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  onClickItem = (title) => (e) => {
    if (title === "Logout") {
      this.onLogoutClick(e)
    }
    this.setState({ selectedMenuItem: title });
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="row dashboard">
        <div className="left-menu col s4 m3 l2">
          <div className="user-details">
            <img
              className="avatar-image circle responsive-img"
              alt=""
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            />
            <span className="user-name center-align"><b>{user.name}</b></span>
            <div className="user-skills black-text">
              <b>Full Stack Developer</b>
              <b>Computer Engineer</b>
            </div>
          </div>
          <div>
            <ul className="collection menu-items">
              {menuItems.map(item =>
                <Link to={item.url}>
                  <MenuItem
                    key={item.title}
                    icon={item.icon}
                    color={item.color}
                    title={item.title}
                    onClickItem={this.onClickItem}
                  />
                </Link>
              )}
            </ul>
          </div>
        </div>
        <div className="content col s8 m9 l10">
          {/* {renderComponent} */}
          <Route exact path="/dashboard/profile" component={EditProfile} />
          <Route exact path="/dashboard/student" component={StudentDashboard} />
          <Route exact path="/dashboard/staff" component={StaffDashboard} />
          <Route exact path="/dashboard/admin" component={AdminDashboard} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);