import React from "react";
import { Alert, Button, ButtonGroup, Container, Table } from "react-bootstrap";
import { connect } from "react-redux";
function Following(props){
    return(
        <>
        <Container>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>성별</th>
                        <th>좋아요</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((item, i)=>{
                            return(
                                <tr key={i}>
                                    <td>1</td>
                                    <td>{props.state[i].name}</td>
                                    <td>{props.state[i].birth_y}년 {props.state[i].birth_m}월 {props.state[i].birth_d}일</td>
                                    <td>{props.state[i].sex===1 ?'남':'여'}</td>
                                    <td>{props.state[i].good}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" onClick={()=>{ props.dispatch({type : 'addCount', payload : i}) }}>+</Button>
                                            <Button variant="danger" onClick={()=>{ props.dispatch({type : 'removeCount', payload : i}) }}>-</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            { props.alertState
            ?(
                <Alert variant="warning">
                    <p>지금 고백하면 천국이 기다립니다.</p>
                    <Button variant='light' onClick={()=>{ props.dispatch({type : 'closeAlert'})}}>닫기</Button>
                </Alert>
            )
            :null
            }
        </Container>
        </>
    )
}
function storeToProps(state){
    return{
        state : state.reducer,
        alertState : state.reducer2
    }
}

export default connect(storeToProps)(Following);