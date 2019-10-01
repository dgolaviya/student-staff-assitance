import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Select, Table, Tabs, Tab } from 'react-materialize';
import { createCourse, getCourses, fetchDepartments, fetchProgramsbyDept, deleteCourse } from "../../actions/actions";


class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      courseDescription: "",
      dept: "",
      program: ""
    }
  }
  componentDidMount() {
    this.props.getCourses();
    this.props.fetchDepartments();
  }
  fetchProgramsbyDept(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.props.fetchProgramsbyDept(e.target.value);
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  deleteCourse = (courseId) => () => {
    this.props.deleteCourse(courseId);
  }

  onSubmit = e => {
    e.preventDefault();
    const course = {
      courseName: this.state.courseName,
      courseDescription: this.state.courseDescription,
      deptId: this.state.dept,
      progId: this.state.program
    };
    this.props.createCourse(course, this.state.dept, this.state.program);
  };
  render() {
    const { courses, departments, programs } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s10">
            <h3>Courses</h3>
            <Tabs className="tab-demo z-depth-1">
              <Tab title="View courses" active>
                <Table>
                  <thead>
                    <tr>
                      <th>Sr. no.</th>
                      <th>Course name</th>
                      <th>Item Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      courses.map((course, index) => {
                        return (
                          <tr key={course.courseId}>
                            <td>{index + 1}</td>
                            <td>{course.courseName}</td>
                            <td>{course.courseDescription}</td>
                            <td>
                              <div onClick={this.deleteCourse(course.courseId)}>Delete</div>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </Tab>
              <Tab title="Create course">
                <form onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.courseName}
                      id="courseName"
                      type="text"
                    />
                    <label htmlFor="courseName">Course Name</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.courseDescription}
                      id="courseDescription"
                      type="text"
                    />
                    <label htmlFor="courseDescription">Course Description</label>
                  </div>
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
                      Submit
                </button>
                  </div>
                </form>
              </Tab>
            </Tabs>


          </div>
        </div>
      </div>
    );
  }
}

CreateCourse.propTypes = {
  fetchDepartments: PropTypes.func.isRequired,
  fetchProgramsbyDept: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  courses: state.course.courses,
  departments: state.auth.departments,
  programs: state.auth.programs,
});


const mapDispatchToProps = (dispatch) => ({
  createCourse: (course, deptId, progId) => dispatch(createCourse(course, deptId, progId)),
  getCourses: () => dispatch(getCourses()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchProgramsbyDept: (deptId) => dispatch(fetchProgramsbyDept(deptId)),
  deleteCourse: (courseId) => dispatch(deleteCourse(courseId))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);