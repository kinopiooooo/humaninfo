import { useContext, useEffect, useState } from "react";
import { Badge, Button, Container, ListGroup, Modal, Nav } from "react-bootstrap";
import {humanContext} from './App.js';
import { CSSTransition } from 'react-transition-group';
import './HumanList.scss'
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function HumanList(props) {
    let [strModal, setstrModal] = useState(false)
    let [show, setShow] = useState(false);
    let handleClose = () => setShow(false);
    let [targetTitle, settargetTitle] = useState(0)
    let [tabSex, settabSex] = useState(0)
    let [tabSwich, settabSwich] = useState(false)
    let human = useContext(humanContext);
    
    return(
        <Container className="mt-3">
            <Nav variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{settabSex(0);settabSwich(false)}}>전체</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{settabSex(1);settabSwich(false)}}>남자</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{settabSex(2);settabSwich(false)}}>여자</Nav.Link>
                </Nav.Item>

            </Nav>
            <CSSTransition in={tabSwich} classNames="fadelist" timeout={500}>
            <ListGroup as="ol" numbered className="mt-3">
            
            
            {
                human.map((item, i)=>{
                    return(
                    tabSex === 0
                    ? <List setHuman={ props.setHuman } i={ i } setShow={setShow} settargetTitle={settargetTitle} key={ i } tabSwich={tabSwich} settabSwich={settabSwich}></List>
                    :   ( tabSex === human[i].sex
                        ?<List setHuman={ props.setHuman } i={ i } setShow={setShow} settargetTitle={settargetTitle} key={ i } tabSwich={tabSwich} settabSwich={settabSwich}></List>
                        : null
                        )
                    )
                })
            }
            </ListGroup>
            </CSSTransition>
            <InfoModal handleClose={ handleClose } show={ show } targetTitle={ targetTitle }></InfoModal>
            
        </Container>
    )
}
function List(props){
    let human = useContext(humanContext);
    useEffect(()=>{
        props.settabSwich(true)
    });
    let history = useHistory();
    // let state = useSelector((state)=> state.reducer)
    let dispatch = useDispatch();
    return(
        <ListGroup.Item as="li" action className="d-flex justify-content-between align-items-center" key={props.key}
            // onClick={()=>{setstrModal(!strModal);console.log(strModal)}}
            onClick={()=>{props.setShow(true); props.settargetTitle(props.i)}}
        >
            <div className='rounded overflow-hidden' style={{"width":"50px","height":"70px"}}>
            <img src={human[props.i].photo} style={{"width":"100%","height":"100%","object-fit":"cover"}}/>
            </div>
            <div className="">
            <div className="fw-bold">{human[props.i].name}</div>
            <span>{human[props.i].birth_y}년 {human[props.i].birth_m}월 {human[props.i].birth_d}일</span>
            </div>
            <Button variant="primary" onClick={(event)=>{
                var array = [...human]
                array[props.i].good = array[props.i].good + 1
                props.setHuman(array)
                event.stopPropagation()
            }}> <i className="bi bi-hand-thumbs-up"></i> <Badge bg="secondary" pill> {human[props.i].good} </Badge>
            </Button>
            <Button variant="primary" onClick={(event)=>{
                event.stopPropagation()
                dispatch({type : 'follow', payload :human[props.i]});
                history.push('./following')
            }}>Follow</Button>
        </ListGroup.Item> 
    )
}

function InfoModal(props){
    let human = useContext(humanContext);
    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ human[props.targetTitle].name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-between align-items-center justify-content-end">
                    <img src={human[props.targetTitle].photo} className="card-img-top flex-shrink-1 w-25" />
                    <dl className="flex-grow-1 ms-3">
                        <dt>이름</dt>
                        <dd>{ human[props.targetTitle].name }</dd>
                        <dt>생년월일</dt>
                        <dd>{human[props.targetTitle].birth_y}년 {human[props.targetTitle].birth_m}월 {human[props.targetTitle].birth_d}일</dd>
                    </dl>
                </div>
            </Modal.Body>
           
        </Modal>
    )
}


export default HumanList;