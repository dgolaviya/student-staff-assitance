import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultAvatar from '../../assets/avatar.png';
import { fetchAvatarImage, logoutUser } from '../../actions/actions'
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 'Profile'
    }
  }
  componentDidMount() {
    this.props.fetchAvatarImage(this.props.userId);
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
    const { menuItems, user, avatarDetail: { avatar, contentType }  } = this.props;
    return (
      <div className="left-menu col s4 m3 l2">
        <div className="user-details">
          {avatar ? <img
              className="avatar-image circle responsive-img"
              alt=""
              src={`data:${contentType};base64, ${avatar}`}
            /> : <img
                className="avatar-image circle responsive-img"
                alt=""
                src={defaultAvatar}
              />}
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
const mapStateToProps = (state) => ({
  avatarDetail: state.auth.avatarDetail,
  userId: state.auth.user.userId
});
const mapDispatchToProps = (dispatch) => ({
  fetchAvatarImage: (userId) => dispatch(fetchAvatarImage(userId)),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);