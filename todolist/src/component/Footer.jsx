import React from 'react'

export default function Footer(props) {
    const {setCurrent,setTasks,current,tasks} = props

    const list = [{
        page:"All"
    },{
        page:"Active"
    },{
        page:"Completed"
    }]

    const handleCurrent = (index) =>{
        setCurrent(index);
        console.log(current);
      }

      const clearCompleted = ()=>{
        setTasks(tasks.filter(task=> !task.isCompleted))
      }

  return (
    <footer className="footer">
            <span className="todo-count">{tasks.filter(task=> !task.isCompleted).length} items left</span>
            <ul className="filters">
                {
                    list.map((item,index)=>
                    <li key={index}>
                        <a href='#'
                            className={current === index?"seleted":""}
                            onClick={()=>handleCurrent(index)}>{item.page}</a>
                    </li>)
                }
            </ul>
            <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
        </footer>
  )
}
