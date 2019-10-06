import React from 'react';
import logo from '../../assets/logo.jpg';
import { Footer, Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import './styles.scss';

const FooterComponent = () => {
  return (
    <Footer
      copyrights="&copy; 2019 ABC university, Melbourne"
      moreLinks= {
        <>
        <a href="javascript:;" className="social-link white-text mr-10"><i className="fa fa-facebook-square"></i></a>
        <a href="javascript:;" className="social-link white-text mr-10"><i className="fa fa-twitter-square"></i></a>
        <a href="javascript:;" className="social-link white-text mr-10"><i className="fa fa-linkedin-square"></i></a>
        </>
      }
      links={<ul>
        <li>
          <Link to="/dashboard/contact-us" className="white-text">
            Contact us
        </Link>
        </li>
        <li>
          <a href="javascript:;" className="white-text">
            Privacy policy
        </a>
        </li>
      </ul>}
      className="example footer mt-20 blue darken-4"
    >
      <Row>
        <Col s={12} className="mb-15">
        <h5>About us</h5>
          ABC University is a...
        </Col>
      </Row>
    </Footer>
  );
}

export default FooterComponent;