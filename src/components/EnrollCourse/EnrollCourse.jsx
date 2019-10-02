import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select, Table, Tabs, Tab } from 'react-materialize';
import { fetchEnrolledCourses } from "../../actions/actions";

class EnrollCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.fetchEnrolledCourses(this.props.user.userId);
  }

  render() {
    const { enrolledCourses } = this.props;
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
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </Tab>
              <Tab title="Enroll course">
                Demo
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

const mapStateToProps = state => ({
  user: state.auth.user,
  enrolledCourses: state.course.enrolledCourses
});


const mapDispatchToProps = (dispatch) => ({
  fetchEnrolledCourses: (userId) => dispatch(fetchEnrolledCourses(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EnrollCourse);