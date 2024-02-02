import React from 'react'

export default function Header(props) {

  const handleChange = (evt) =>{
    console.log("onChange"+evt.target.value);
    props.setText(evt.target.value);
}

const handleKeyDown = (event)=>{
    if(event.key === 'Enter')
    {
        props.handleAdd();
    }
}

  return (
    <header className="header">
            <h1>todos</h1>
            <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus 
            onChange={handleChange} 
            value={props.text} 
            onKeyDown={handleKeyDown}/>
        </header>
  )
}
