import React from 'react';
import { Card, Row, Col, Icon } from 'react-materialize';

const StudentLanding = () => {
  return (
       <>
    <Row style={{ padding: '0 25px' }}>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>account_circle</Icon>
          <div className="card-header">30</div>
          <div>This is simple card</div>
        </Card>
      </Col>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>android</Icon>
          <div className="card-header">40</div>
          <div>This is simple card</div>
        </Card>
      </Col>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>announcement</Icon>
          <div className="card-header">10</div>
          <div>This is simple card</div>
        </Card>
      </Col>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>assignment</Icon>
          <div className="card-header">50</div>
          <div>This is simple card</div>
        </Card>
      </Col>
    </Row>
    <Row style={{ padding: '0 25px' }}>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>assignment_turned_in</Icon>
          <div className="card-header">20</div>
          <div>This is simple card</div>
        </Card>
      </Col>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>build</Icon>
          <div className="card-header">30</div>
          <div>This is simple card</div>
        </Card>
      </Col>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>description</Icon>
          <div className="card-header">30</div>
          <div>This is simple card</div>
        </Card>
      </Col>
      <Col m={3} s={6}>
        <Card className="blue item-card lighten-2">
          <Icon large>help</Icon>
          <div className="card-header">30</div>
          <div>This is simple card</div>
        </Card>
      </Col>
    </Row>
    </>
  );
}

export default StudentLanding;