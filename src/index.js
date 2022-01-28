import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import { combineReducers, createStore } from 'redux';



let initialFollowing=[
  {id : 1, name : '한요시', "birth_y" : 1988, birth_m : 8, birth_d : 24, sex : 2, photo : "http://data.systemiclab.or.kr/upload/MEMBER/1629551241_339.jpg", good : 12},
]


function reducer2(state = true, action){
  if(action.type === 'closeAlert'){
    return false
  }else{
    return state
  }
}

function reducer(state = initialFollowing, action){
  if (action.type === 'follow'){
    
    let found = state.findIndex(state => state.id === action.payload.id)

    if (found >=0){
      let copy = [...state];
      alert('이미 팔로우 신청된 인재입니다.')
      return copy
    }else{
      let copy = [...state];
      copy.push(action.payload);
      return copy
    }

  }else if( action.type === 'addCount' ){
    let copy = [...state];
    copy[action.payload].good++;
    return copy

  }else if(action.type === 'removeCount'){
    let copy = [...state];
    if(copy[action.payload].good>0){
      copy[action.payload].good--;
    }else{
      alert('더이상 좋아요수를 줄일 수 없습니다')
    } 
    return copy

  }else{
    return state
  }
}

let followingitem = createStore(combineReducers({reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={followingitem}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
