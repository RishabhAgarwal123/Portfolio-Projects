import React, { useState } from 'react'
import Navbar from './Navbar';
import Task from './Task';

const Tasks = () => {
  const [taskName, setTaskName] = useState('');

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  }

  return (
    <>
      <Navbar />
      <div className='tasks'>
        <div className='container'>
          <h1>Daily To Do List</h1>
          <div className="addBox">
            <input 
              className="addInput" 
              type="text" 
              name="taskName"
              value={taskName || ''} 
              onChange={(e) => handleInputChange(e)}
              placeholder="Add a task" 
            />
            <button className="c-button">
              <span className="c-main">
                <span className="c-ico"><span className="c-blur"></span> <span className="ico-text">+</span></span>
                Add Task
              </span>
            </button>
          </div>
          <div className='task'>
            <Task />
          </div>
        </div>
      </div>
    </>
  )
}

export default Tasks