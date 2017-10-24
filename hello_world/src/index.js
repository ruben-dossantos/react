import React from 'react'
import ReactDOM from 'react-dom'

function formatName(user){
  return user.firstName + ' ' + user.lastName
}

const user = {
  firstName: 'Walter',
  lastName: 'White'
}

// const element = <h1>Hello, {formatName(user)}!</h1>
const element = ( // parenthesis avoids automatic semicolon insertion
  <h1>
    Hello, {formatName(user)}!
  </h1>
)

function getGreeting(user){
  if(user){
    return (
      <div>
      <h1>Hello, {formatName(user)}!</h1>
      <div>{putImage()} </div>
      </div>
    )
  }
  return <h1>Hello, Stranger!</h1>
}

function putImage(){
  return <img src="favicon.ico" alt="site icon"></img>
}

ReactDOM.render(
  getGreeting(user),
  document.getElementById('root')
)
