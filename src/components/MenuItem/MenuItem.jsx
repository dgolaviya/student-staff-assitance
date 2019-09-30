import React, { Component } from 'react';
class MenuItem extends Component {
  render() {
    const {color, icon, title, onClickItem} = this.props;
    return (
      <li className="collection-item menu-item" onClick={onClickItem(title)}>
        <i className={`material-icons ${color} px-10`}>{icon}</i>
        <b className="grey-text lighten-3">{title}</b>
      </li>
    )
  }
}

export default MenuItem
