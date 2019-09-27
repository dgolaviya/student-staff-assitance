
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export class ShowPosts extends Component {
  state={
    posts: [],
    showData: false
  }
  componentDidMount() {
    axios.get('http://localhost:3000/posts').then(res => {
       this.setState({posts: res.data});
    });
  }
  fetchPostsHandler = () => {
    this.setState({showData: true});
  }
  render() {
    const {posts, showData} = this.state;
    return (
      <Container style={{padding: '30px'}}>
        <Row>
          <Col><Button onClick={this.fetchPostsHandler} variant="primary">Fetch Posts</Button></Col>
        </Row>
        {showData && posts.map(post => (
          <Row key={post.id}>
          <Col>{post.id}</Col>
          <Col>{post.title}</Col>
          <Col>{post.author}</Col>
        </Row>
        ))}
      </Container>
    )
  }
}

export default ShowPosts;
