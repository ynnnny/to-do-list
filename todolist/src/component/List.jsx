import React,{useState,useRef,useEffect} from 'react'

export default function List(props) {
    const {tasks,getfilterTasks,handleComplete,setTasks} = props

    const [edit,setEdit] = useState({editNumber:null,editText:""})
    const editInputRef = useRef(null);

    const handleDel = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        if (taskToEdit) {
          setEdit({editNumber:id,editText:taskToEdit.mytext})
        }
    };
      
    const editChange = (evt) => {
        const { value } = evt.target;
        setEdit(prevEdit => ({ editNumber:prevEdit.editNumber, editText: value }));
    }

    const handleBlur = (event) => {
        const text = event.target.value;
        // 当用户点击页面其他地方时保存修改并退出编辑状态
        if (edit.editNumber !== null) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === edit.editNumber ? { ...task, mytext: text } : task
            )
          );
          setEdit({editNumber:null,editText:""});
        }
    };

    useEffect(() => {
        // 使用 useRef 创建的 ref 对象
        // 在组件渲染后 current 属性将指向相应的 DOM 元素
        if (editInputRef.current) {
          editInputRef.current.focus();
        }
      }, [edit.editNumber]); // 仅在 editNumber 改变时触发 useEffect

  return (
    <ul className="todo-list">
        {
            getfilterTasks().map(item=>
                <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
                    {edit.editNumber === item.id?
                      (
                        <div>
                          <input type='text' onChange={editChange} value={edit.editText} ref={editInputRef} className='new-todo'
                            onKeyDown={(evt) => {
                              if (evt.key === 'Enter') {
                                handleBlur(evt);
                              }
                            }}
                            onBlur={handleBlur}
                            onClick={(evt) => evt.stopPropagation()}/>
                        </div>
                      ):(
                        <div>
                          <input type='checkbox' checked = {item.isCompleted} onChange={()=>handleComplete(item.id)} className='toggle'/>
                          <label onDoubleClick={()=>handleEdit(item.id)}>
                            {item.mytext}
                          </label>
                          <button className="destroy" onClick={()=>handleDel(item.id)}></button>
                        </div>
                   )}</li>)
                }
            </ul>
  )
}
