import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select, Table, Tabs, Tab } from 'react-materialize';
import { fetchEnrolledCourses, getAvailableCourses, enrollCourse, getCourses } from "../../actions/actions";

class EnrollCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.getCourses();
    this.props.fetchEnrolledCourses(this.props.user.userId);
    this.props.getAvailableCourses(this.props.user.deptId, this.props.user.progId);
  }

  enrollCourse = (userId, courseIds) => () => {
    console.log('enroll', userId, courseIds);
    this.props.enrollCourse(userId, courseIds);
  }

  render() {
    const { enrolledCourses, availableCourses } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "4rem" }}>
          <div className="col s10">
            <h3>Enroll Courses</h3>
            <Tabs className="tab-demo z-depth-1">
              <Tab title="Enrolled courses" active>
                <Table>
                  <thead>
                    <tr>
                      <th>Sr. no.</th>
                      <th>Course name</th>
                      <th>Description</th>
                      <th>Approved?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      enrolledCourses.map((course, index) => {
                        return (
                          <tr key={course.courseId}>
                            <td>{index + 1}</td>
                            <td>{course.courseName}</td>
                            <td>{course.courseDescription}</td>
                            <td>{course.approved ? 'Yes' : 'No'}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </Tab>
              <Tab title="Enroll course">
                <Table>
                  <thead>
                    <tr>
                      <th>Sr. no.</th>
                      <th>Course name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      availableCourses.map((course, index) => {
                        return (
                          <tr key={course.courseId}>
                            <td>{index + 1}</td>
                            <td>{course.courseName}</td>
                            <td>{course.courseDescription}</td>
                            <td><div onClick={this.enrollCourse(this.props.user.userId, course.courseId)}>Enroll</div></td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

EnrollCourse.propTypes = {
};

const mapStateToProps = state => {
  const enrolledCourseIds = state.course.enrolledCourses.map(course => course.courseId)
  return ({
    user: state.auth.user,
    enrolledCourses: state.course.enrolledCourses,
    availableCourses: state.course.availableCourses.filter(course => !enrolledCourseIds.includes(course.courseId))
  })
};


const mapDispatchToProps = (dispatch) => ({
  getCourses: () => dispatch(getCourses()),
  fetchEnrolledCourses: (userId) => dispatch(fetchEnrolledCourses(userId)),
  enrollCourse: (userId, courseIds) => dispatch(enrollCourse(userId, courseIds)),
  getAvailableCourses: (deptId, progId) => dispatch(getAvailableCourses(deptId, progId))
});
export default connect(mapStateToProps, mapDispatchToProps)(EnrollCourse);