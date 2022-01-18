import axios from 'axios';
import {Badge, Button, Container, Figure, ListGroup, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

function App() {


  let [human, setHuman] = useState([
    {"id" : null,"name" : null,"birth_y" : null,"birth_m" : null,"birth_d" : null,"sex" : null, "photo" : null, 'good':null}
  ]);

  useEffect(()=>{
    axios.get('https://oiponik.github.io/YoBatWedding/data.json')
    .then((result)=>{
      setHuman([...result.data])
      console.log(human)
      })
    .catch(()=>{ 
      console.log('실패')
      })
  }, [])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Human-Info</Navbar.Brand>
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
      <HumanList human={ human } setHuman = {setHuman}></HumanList>
    </div>
  );
}

function HumanList(props){
  return(
    <ListGroup as="ol" numbered>
    {
       props.human.map((item, i)=>{
         return(
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" key={i}>
            <div className='rounded overflow-hidden' style={{"width":"50px","height":"70px"}}>
              <img src={props.human[i].photo} style={{"width":"100%","height":"100%","object-fit":"cover"}}/>
            </div>
            <div className="">
              <div className="fw-bold">{props.human[i].name}</div>
              <span>{props.human[i].birth_y}년 {props.human[i].birth_m}월 {props.human[i].birth_d}일</span>
            </div>
            <Button variant="primary" onClick={()=>{
                    var array = [...props.human]
                    array[i].good = array[i].good + 1
                    props.setHuman(array)
                  }}> <i class="bi bi-hand-thumbs-up"></i> <Badge bg="secondary" pill> {props.human[i].good} </Badge>
                </Button>
          </ListGroup.Item>
        )
      })
    }
    </ListGroup>
  )
}
export default App;
//https://kinopiooooo.github.io/YoBatWedding/

