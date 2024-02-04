import React from 'react'

export default function Header(props) {

const handleKeyDown = (event)=>{
    if(event.key === 'Enter')
    {
        props.handleAdd(event);
    }
}

  return (
    <header className="header">
            <h1>todos</h1>
            <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus 
            onKeyDown={handleKeyDown}/>
        </header>
  )
}
