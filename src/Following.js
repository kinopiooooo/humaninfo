import React from "react";
import { Alert, Button, ButtonGroup, Container, Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
function Following(props){

    let state = useSelector((state)=> state.reducer)
    let state2 = useSelector((state)=> state.reducer2)
    let dispatch = useDispatch();
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
                        state.map((item, i)=>{
                            return(
                                <tr key={i}>
                                    <td>1</td>
                                    <td>{state[i].name}</td>
                                    <td>{state[i].birth_y}년 {state[i].birth_m}월 {state[i].birth_d}일</td>
                                    <td>{state[i].sex===1 ?'남':'여'}</td>
                                    <td>{state[i].good}</td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" onClick={()=>{ dispatch({type : 'addCount', payload : i}) }}>+</Button>
                                            <Button variant="danger" onClick={()=>{ dispatch({type : 'removeCount', payload : i}) }}>-</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            { state2
            ?(
                <Alert variant="warning">
                    <p>지금 고백하면 천국이 기다립니다.</p>
                    <Button variant='light' onClick={()=>{ dispatch({type : 'closeAlert'})}}>닫기</Button>
                </Alert>
            )
            :null
            }
        </Container>
        </>
    )
}
// function storeToProps(state){
//     return{
//         state : state.reducer,
//         alertState : state.reducer2
//     }
// }

// export default connect(storeToProps)(Following);

export default Following;