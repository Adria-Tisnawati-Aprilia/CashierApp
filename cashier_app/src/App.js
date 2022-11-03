import './App.css';
import {Row, Col, Container} from 'react-bootstrap'
import {Hasil, NavbarComponent, ListCategories} from './component';
function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <Container fluid mt="3">
        <Row>
          <ListCategories/>
          <Col>
            <h5><strong>Daftar Produk</strong></h5>
            <hr/>
          </Col>
          <Hasil/>
        </Row>
      </Container>
    </div>
  );
}

export default App;
