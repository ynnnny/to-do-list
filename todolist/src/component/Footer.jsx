import React from 'react'

export default function Footer(props) {

    const tasks = [...props.tasks]


    const handleCurrent = (index) =>{
        props.setCurrent(index);
        console.log(props.current);
      }

      const clearCompleted = ()=>{
        props.setTasks(tasks.filter(task=> !task.isCompleted))
      }

  return (
    <footer className="footer">
            <span className="todo-count">{tasks.filter(task=> !task.isCompleted).length} items left</span>
            <ul className="filters">
                <li>
                    <a href="#/" 
                    className={props.current === 0? "selected":""}
                    onClick={()=>handleCurrent(0)}>All</a>
                </li>
                <li>
                    <a href="#/active"
                    className={props.current === 1? "selected":""}
                    onClick={()=>handleCurrent(1)}>Active</a>
                </li>
                <li>
                    <a href="#/completed"
                    className={props.current === 2? "selected":""}
                    onClick={()=>handleCurrent(2)}>Completed</a>
                </li>
            </ul>
            <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
  )
}
