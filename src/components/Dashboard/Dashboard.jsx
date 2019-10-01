import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/actions";
import MenuItem from '../MenuItem/MenuItem';
import StudentDashboard from '../StudentDashboard';
import AdminDashboard from '../AdminDashboard';
import StaffDashboard from '../StaffDashboard';
import './styles.scss';

const menuItems = [
  {
    title: 'Profile',
    icon: 'person',
    color: 'red-text'
  },
  {
    title: 'Experience',
    icon: 'history',
    color: 'purple-text'
  },
  {
    title: 'Projects',
    icon: 'collections',
    color: 'green-text'
  },
  {
    title: 'Skills',
    icon: 'web',
    color: 'blue-text'
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
  };

  onClickItem = (title) => () => {
    this.setState({ selectedMenuItem: title });
  };

  render() {
    const { user } = this.props.auth;
    let renderComponent = <StudentDashboard />;
    if (user.roleId === '1') {
      renderComponent = <AdminDashboard />;
    } else if (user.roleId === '2') {
      renderComponent = <StaffDashboard />;
    }

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
                <MenuItem
                  key={item.title}
                  icon={item.icon}
                  color={item.color}
                  title={item.title}
                  onClickItem={this.onClickItem}
                />)}
            </ul>
          </div>
        </div>
        <div className="content col s8 m9 l10">
          {renderComponent}
          <div
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            onClick={this.onLogoutClick}
          >
            Logout
          </div>
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