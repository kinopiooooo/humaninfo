import axios from 'axios';
import {Badge, Button, Card, Container, Figure, ListGroup, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { Link, Route, Routes, Switch } from 'react-router-dom';
import HumanList from './HumanList';
import Following from './Following';

export let humanContext = React.createContext();


function App() {


  let [human, setHuman] = useState([
    {"id" : null,"name" : null,"birth_y" : null,"birth_m" : null,"birth_d" : null,"sex" : null, "photo" : null, 'good':null}
  ]);

  useEffect(()=>{
    axios.get('https://oiponik.github.io/YoBatWedding/data.json')
    .then((result)=>{
      setHuman([...result.data])
      })
    .catch(()=>{ 
      })
  }, [])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/">Human-Info</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to="comList">기업 정보</Link></Nav.Link>
              <Nav.Link><Link to="humanList">인재 정보</Link></Nav.Link>

              <NavDropdown title="MyPage" id="basic-nav-dropdown">
                <NavDropdown.Item href="/following">Following</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/humanList">
          <humanContext.Provider value={human}>
            <HumanList setHuman={ setHuman }></HumanList>
          </humanContext.Provider>
        </Route>
        <Route path="/following">
          <Following></Following>
        </Route>
        <Route path="/:id">
          404 Error
          
        </Route>
      </Switch>
      {/* <HumanList human={ human } setHuman = {setHuman}></HumanList> */}
    </div>
  );
}
function Home(){
  return(
    <Container className='my-3'>
      <div className='row g-2'>
        <div className='col-md-6'>
          <Card className=''>
            <Card.Body>
              <Card.Title>기업 정보</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">DB에 저장된 기업정보</Card.Subtitle>
              <Card.Text>
                여러 기업의 정보를 조회할 수 있습니다
              </Card.Text>
              <Button variant="primary">기업정보 보기</Button>
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-6'>
          <Card className=''>
            <Card.Body>
              <Card.Title>인재 정보</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">DB에 저장된 인재정보</Card.Subtitle>
              <Card.Text>
                여러 관련 인재정보를 조회할 수 있습니다
              </Card.Text>
              <Button variant="primary" href={"/humanList"}>인재정보 보기</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  )
}
export default App;
//https://kinopiooooo.github.io/YoBatWedding/

