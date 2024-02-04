import React from 'react'

export default function Checked(props) {
  const {isChecked,setTasks,setisChecked} = props

    const handleAll = () => {
        let previsChecked = isChecked
        setisChecked((previsChecked) => !previsChecked);
        setTasks((prevTasks) =>
          prevTasks.map((task) => ({
            ...task,
            isCompleted: !previsChecked,
          }))
        );
      };

  return (
    <div className="toggle-all-container">
                <input className="toggle-all" type="checkbox"/>
                <label className="toggle-all-label" htmlFor="toggle-all"  onClick={handleAll}>Mark all as complete</label>
            </div>
  )
}
