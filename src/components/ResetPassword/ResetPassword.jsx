import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Toast } from 'react-materialize';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { resetPassword } from "../../actions/actions";
import Header from "../Header";
import Footer from "../Footer";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      userNameOrEmailId: "",
      errors: {},
      success: false
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.success && !prevProps.success) {
      this.setState({ success: true });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.resetPassword(this.state.userNameOrEmailId);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="content" style={{ overflow: 'auto', height: '100%' }}>
        <Header />
        <div className="container">
          {this.state.success ? <Toast options={{ html: 'Success! Please check your email.' }} /> : null}
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Reset</b> password
                </h4>
                <p className="grey-text text-darken-1">
                  Back to <Link to="/login">Login</Link>
                </p>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.userNameOrEmailId}
                    error={errors.email}
                    id="userNameOrEmailId"
                    type="text"
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })}
                    required
                  />
                  <label htmlFor="userNameOrEmailId">Email</label>
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ResetPassword.propTypes = {
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.auth.success
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (userNameOrEmailId) => dispatch(resetPassword(userNameOrEmailId))
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);