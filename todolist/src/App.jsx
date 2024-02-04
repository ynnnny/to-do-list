import React, { useState ,useEffect,useRef} from 'react'
import Header from './component/Header';
import Checked from './component/Checked';
import Footer from './component/Footer';
import List from './component/List';

export default function Todo() {
    const [tasks,setTasks] = useState([]);
    const [current,setCurrent] = useState(0)
    const [isChecked,setisChecked] = useState(false)

    const handleAdd = (event) => {
      const text = event.target.value;
        if (text.trim() !== '') {
          setTasks([...tasks, { mytext: text, isCompleted: false, id: Date.now() }]);
          event.target.value = "";
        }
      };
      const handleComplete = (id) => {
        setisChecked(false)
        console.log("handleComplete is called for id:", id);
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.id === id) {
                    return { ...task, isCompleted: !task.isCompleted };
                }
                return task;
            });
        });
    };

      const getfilterTasks = ()=>{
        switch(current){
            case 0:
                {
                    return tasks;
                }
            case 1:
                {
                    return tasks.filter(task=> !task.isCompleted);
                }
            case 2:
                {
                    return tasks.filter(task=> task.isCompleted);
                }
            default:
                return tasks;
        }
      }
  return (
        <section className='todoapp'>
        <Header handleAdd={handleAdd}></Header>
        <main className="main">
            <Checked isChecked={isChecked} setisChecked={setisChecked} setTasks={setTasks}></Checked>
            <List tasks={tasks} getfilterTasks={getfilterTasks} handleComplete={handleComplete} setTasks={setTasks}></List>
        </main>
        <Footer current={current} setCurrent={setCurrent} tasks={tasks} setTasks={setTasks}></Footer>
    </section>
  )
  }
