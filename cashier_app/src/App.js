import './App.css';
import {Row, Col, Container} from 'react-bootstrap'
import {Hasil, NavbarComponent, ListCategories, Menus} from './component';
import axios from 'axios';
import React, { Component } from 'react'
import {API_URL} from './utils/constant'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      menus : [],
    }
  }
  
  componentDidMount(){
    axios
      .get(API_URL + "products")
      .then(res => {
        const menus = res.data;
        this.setState({ menus});
      })
      .catch (error => {
        console.log("error")
      })
  }
  
  render() {
  const {menus} = this.state;
    return (
      <div className="App">
      <NavbarComponent/>
      <Container fluid mt="3">
        <Row>
          <ListCategories/>
          <Col>
            <h5><strong>Daftar Produk</strong></h5>
            <hr/>
            <Row>
              {menus && menus.map((menu)=> (
                <Menus 
                  key={menu.id}
                  menu={menu}
                />
              ))}
            </Row>
          </Col>
          <Hasil/>
        </Row>
      </Container>
    </div>
    )
  }
}

