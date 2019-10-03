import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Select } from 'react-materialize';
import { connect } from "react-redux";
import classnames from "classnames";
import { registerUser, fetchUserRoles, fetchDepartments, fetchProgramsbyDept } from "../../actions/actions";
import ModalDialog from '../ModalDialog';
class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      mobile: "",
      dept: "",
      program: "",
      password: "",
      password2: "",
      userType: "",
      errors: {},
      hideDeptProg: false,
      showModal: false
    };
  }

  componentDidMount() {
      this.props.fetchDepartments();
      this.props.fetchUserRoles();
  }

  fetchProgramsbyDept(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.props.fetchProgramsbyDept(e.target.value);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.success) {
      // this.props.history.push("/login");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      if (this.state.userType === '2') {
        this.setState({ hideDeptProg: true });
      }
      else {
        this.setState({ hideDeptProg: false });
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.username,
      emailId: this.state.email,
      mobileNo: this.state.mobile,
      deptId: this.state.dept,
      progId: this.state.program,
      password: this.state.password,
      roleId: this.state.userType
    };
    if(this.state.userType === "1" || this.state.userType === "2") {
      delete newUser.deptId;
      delete newUser.progId;
    }
    this.props.registerUser(newUser, this.props.history);
    this.setState({ showModal: true });
  };

  resetShowModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { errors } = this.state;
    const { departments, programs, userRoles } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                />
                <label htmlFor="firstName">First Name</label>
                <span className="red-text">{errors.firstName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                />
                <label htmlFor="lastName">Last Name</label>
                <span className="red-text">{errors.lastName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <label htmlFor="username">Username</label>
                <span className="red-text">{errors.username}</span>
              </div>
              <Select
                s={12}
                value={this.state.userType}
                id="userType"
                onChange={this.onChange}
              >
                <option value="" disabled>Select user type</option>
                {
                  userRoles.map((role) => {
                    return <option value={role.roleId} key={role.roleId}>{role.type}</option>
                  })
                }
              </Select>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                  type="email"
                  required
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.mobile}
                  error={errors.mobile}
                  id="mobile"
                  className={classnames("", {
                    invalid: errors.mobile
                  })}
                  type="tel"
                  required
                />
                <label htmlFor="mobile">Mobile Number</label>
                <span className="red-text">{errors.mobile}</span>
              </div>
              {!this.state.hideDeptProg ?
                <>
                  <Select
                    s={12}
                    value={this.state.dept}
                    id="dept"
                    onChange={(event) => this.fetchProgramsbyDept(event)}
                  >
                    <option value="" disabled>Select department</option>
                    {
                      departments.map((dept) => {
                        return <option value={dept.deptId} key={dept.deptId}>{dept.deptName}</option>
                      })
                    }
                  </Select>
                  <Select
                    s={12}
                    value={this.state.program}
                    id="program"
                    onChange={this.onChange}
                  >
                    <option value="" disabled>Select program</option>
                    {
                      programs.map((prog) => {
                        return <option value={prog.progId} key={prog.progId}>{prog.progName}</option>
                      })
                    }
                  </Select>
                </>
                : null}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
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
                  Sign up
                </button>
                <ModalDialog
                  resetShowModal={this.resetShowModal}
                  history={this.props.history}
                  open={this.state.showModal}
                  onCloseEnd={() => this.props.history.push('/dashboard/manage-users')}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  fetchDepartments: PropTypes.func.isRequired,
  fetchProgramsbyDept: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userRoles: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  departments: state.auth.departments,
  programs: state.auth.programs,
  userRoles: state.auth.userRoles.filter(role => role.type.toLowerCase() !== 'admin'),
  errors: state.errors
});


const mapDispatchToProps = (dispatch) => ({
  registerUser: (userData, history) => dispatch(registerUser(userData, history)),
  fetchUserRoles: () => dispatch(fetchUserRoles()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchProgramsbyDept: (deptId) => dispatch(fetchProgramsbyDept(deptId))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);