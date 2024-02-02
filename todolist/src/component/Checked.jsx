import React from 'react'

export default function Checked(props) {


    const handleAll = () => {
        let previsChecked = props.isChecked
        props.setisChecked((previsChecked) => !previsChecked);
        props.setTasks((prevTasks) =>
          prevTasks.map((task) => ({
            ...task,
            isCompleted: !previsChecked,
          }))
        );
      };

  return (
    <div className="toggle-all-container">
                <input className="toggle-all" type="checkbox" checked={props.isChecked} />
                <label className="toggle-all-label" htmlFor="toggle-all"  onClick={handleAll}>Mark all as complete</label>
            </div>
  )
}
