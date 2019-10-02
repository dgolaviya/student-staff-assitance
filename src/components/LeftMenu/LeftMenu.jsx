import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { NavLink } from 'react-router-dom';

class LeftMenu extends React.Component {
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
    const { menuItems, user } = this.props;
    return (
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
              <NavLink to={item.url} key={item.title} activeClassName="active" exact>
                <MenuItem
                  icon={item.icon}
                  color={item.color}
                  title={item.title}
                  onClickItem={this.onClickItem}
                />
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default LeftMenu;