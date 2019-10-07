import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Row, Col, Icon, CardPanel } from 'react-materialize';
import { fetchEvents, fetchDocuments, fetchDepartments, fetchPrograms } from "../../actions/actions";


class StudentLanding extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
    this.props.fetchDocuments();
    this.props.fetchDepartments();
    this.props.fetchPrograms();
  }
  render() {
    const { allPrograms, departments, user } = this.props;
    let progList = {};
    let deptList = {}
    allPrograms.forEach(p => {
      progList = { ...progList, [p.progId]: p.progName }
    });
    departments.forEach(d => deptList = { ...deptList, [d.deptId]: d.deptName });
    return (
      <>
        <div className="row">
          <div className="col s12">
            <CardPanel className="blue lighten-2 white-text p-10">
              <p>Hi, <b>{this.props.user.firstName} {this.props.user.lastName}</b><br />
                <b><i>Welcome to ABC University student portal</i></b></p>
                <p><b>Department: </b>{deptList[user.deptId]}<br/>
                <b>Program: </b>{progList[user.progId]}</p>
            </CardPanel>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <Col m={3} s={6}>
                <Card className="blue item-card lighten-2">
                  <Link to={{ pathname: '/dashboard/news' }}>
                    <Icon large className="black-text">info</Icon>
                    <div className="card-header black-text">{this.props.news.length || 0}</div>
                    <div className="black-text">News</div>
                  </Link>
                </Card>
              </Col>
              <Col m={3} s={6}>
                <Card className="blue item-card lighten-2">
                  <Link to={{ pathname: '/dashboard/news' }}>
                    <Icon large className="black-text">announcement</Icon>
                    <div className="card-header black-text">{this.props.announcements.length || 0}</div>
                    <div className="black-text">Announcements</div>
                  </Link>
                </Card>
              </Col>
              <Col m={3} s={6}>
                <Card className="blue item-card lighten-2">
                  <Link to={{ pathname: '/dashboard/documents' }}>
                    <Icon large className="black-text">book</Icon>
                    <div className="card-header black-text">{this.props.documents.length || 0}</div>
                    <div className="black-text">Articles</div>
                  </Link>
                </Card>
              </Col>
            </div>
          </div>
          <div className="col s12">
            <Row>
              <h5 className="p-10">Blog</h5>
              <div className="blogs-home">
                {this.props.blogPosts.map((post, index) => (
                  <Col s={3} key={index}>
                    <Card className="blue item-card lighten-2">
                      <div className="card-header">{post.title}</div>
                      <div className="card-body">{post.description}</div>
                    </Card>
                  </Col>
                ))}
              </div>
            </Row>
          </div>
        </div>
      </>
    );
  }
}
StudentLanding.defaultProps = {
  blogPosts: []
};
StudentLanding.propTypes = {
  blogPosts: PropTypes.array
};

const mapStateToProps = state => ({
  announcements: state.events.announcements,
  news: state.events.news,
  blogPosts: state.events.blogPosts,
  documents: state.documents.documents,
  user: state.auth.user,
  departments: state.auth.departments,
  allPrograms: state.auth.allPrograms
});


const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchDocuments: () => dispatch(fetchDocuments()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchPrograms: () => dispatch(fetchPrograms())
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentLanding);