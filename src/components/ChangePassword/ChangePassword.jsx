import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Select, Button } from "react-materialize";
import { changePassword } from "../../actions/actions";

class ChangePassword extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  changePassword = e => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirmPassword) {
      this.props.changePassword(this.props.user.userId, this.state.newPassword);
    } else {
      let errors = this.state.errors;
      errors.confirmPassword = "Password doesn't match";
      this.setState({ errors: errors });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <form onSubmit={this.changePassword}>
                <div className="input-field col s12">
                  <TextInput
                    id="newPassword"
                    onChange={this.onChange}
                    error={errors.password}
                    type="password"
                    label="New Password"
                    value={this.state.newPassword}
                  />
                  <span className="red-text">{errors.newPassword}</span>
                </div>
                <div className="input-field col s12">
                  <TextInput
                    id="confirmPassword"
                    onChange={this.onChange}
                    error={errors.confirmPassword}
                    type="password"
                    label="Confirm Password"
                    value={this.state.confirmPassword}
                  />
                  <span className="red-text">{errors.confirmPassword}</span>
                </div>
                <div className="input-field col s12">
                  <Button
                    className="blue"
                    blue
                    large
                    waves="light"
                    type="submit"
                  >
                    Change Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  changePassword: (userId, newPassword) =>
    dispatch(changePassword(userId, newPassword))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
