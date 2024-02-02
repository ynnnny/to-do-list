import React, { useState ,useEffect,useRef} from 'react'
import Header from './Header';
import Checked from './Checked';
import Footer from './Footer';

export default function Todo() {
    const [text,setText] = useState('');
    const [tasks,setTasks] = useState([]);
    const [editNumber,seteditNumber] = useState(null)
    const [editText,seteditText] = useState('')
    const editInputRef = useRef(null);
    const [current,setCurrent] = useState(0)
    const [isChecked,setisChecked] = useState(false)

    const handleAdd = () => {
        if (text.trim() !== '') {
          setTasks([...tasks, { mytext: text, isCompleted: false, id: Date.now() }]);
          setText('');
          seteditNumber(null);
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

    const handleDel = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

      const handleEdit = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
          seteditText(taskToEdit.mytext);
          seteditNumber(id);
        }
      };
      
      const editChange = (evt) =>{
        console.log("onChange"+evt.target.value);
        seteditText(evt.target.value);
    }

      const handleBlur = () => {
        // 当用户点击页面其他地方时保存修改并退出编辑状态
        if (editNumber !== null) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editNumber ? { ...task, mytext: editText } : task
            )
          );
          seteditNumber(null);
        }
      };

      useEffect(() => {
        // 使用 useRef 创建的 ref 对象
        // 在组件渲染后 current 属性将指向相应的 DOM 元素
        if (editInputRef.current) {
          editInputRef.current.focus();
        }
      }, [editNumber]); // 仅在 editNumber 改变时触发 useEffect

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
        <Header setTasks={setTasks} seteditNumber={seteditNumber} handleAdd={handleAdd} text={text} setText={setText}></Header>
        <main className="main">
            <Checked isChecked={isChecked} setisChecked={setisChecked} setTasks={setTasks}></Checked>
            <ul className="todo-list">
            {
                    getfilterTasks().map(item=>
                <li key={item.id}
                className={item.isCompleted ? 'completed' : ''}>
                    {editNumber === item.id?
                   (
                    <div>
                  <input
                    type='text'
                    style={{
                      height:"60px",
                      width:"490px",
                      border:"transparent",
                      fontSize:"24px",
                      paddingLeft:"58px",
                      justifyContent:"center"
                  }}
                    value={editText}
                    onChange={editChange}
                    ref={editInputRef}
                    onKeyDown={(evt) => {
                      if (evt.key === 'Enter') {
                        handleBlur();
                      }
                    }}
                    onBlur={handleBlur}
                    onClick={(evt) => evt.stopPropagation()} // 阻止冒泡以防止触发全局点击事件
                  />
                </div>
                   ):(
                    <div>
                    <input 
                    type='checkbox' 
                    checked = {item.isCompleted}
                    onChange={()=>handleComplete(item.id)}
                    className='toggle'/>
                    <label onDoubleClick={()=>handleEdit(item.id)}>
                    {item.mytext}
                    </label>
                    <button className="destroy"
                    onClick={()=>handleDel(item.id)}></button>
                    </div>
                   )}
                    </li>)
                }
            </ul>
        </main>
        <Footer current={current} setCurrent={setCurrent} tasks={tasks} setTasks={setTasks}></Footer>
    </section>
  )
  }