import { Badge, Container, ListGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  let [human, sethuman] = useState([{id: null, name: null, birth_y: null, birth_m: null, birth_d: null}]);
  
  useEffect(()=>{
    axios.get('https://kinopiooooo.github.io/YoBatWedding/data.json')
    .then((result)=>{
      
      sethuman([...result.data])
     })
    .catch(()=>{ 
      
      console.log('실패')
     })
   }, [])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">인재정보</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <List human={human}></List>
    </div>
  );
}


function List(props){
  return(
    <ListGroup as="ol" numbered>
      {
        props.human.map((item, i)=>{
          return(
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={i}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{props.human[i].name}</div>
                <p>{props.human[i].birth_y}년 {props.human[i].birth_m}월 {props.human[i].birth_d}일</p>
              </div>
              <Badge variant="primary" pill>14</Badge>
            </ListGroup.Item>
          )
        })
      }
      
    </ListGroup>
  )
}
export default App;
//https://kinopiooooo.github.io/YoBatWedding/

