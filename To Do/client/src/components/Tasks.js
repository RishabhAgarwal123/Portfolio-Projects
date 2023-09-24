import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setTasks } from '../redux/reducer';

const Tasks = () => {
  const dispatch = useDispatch();
  const { user, loading, tasks } = useSelector(state => state.user);
  const [items, setItems] = useState(tasks);
  const [checked, setChecked] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [buttonText, setButtonText] = useState('Add Task');

  const defaultState = () => {
    setTaskName('');
    setTaskDescription('');
    setButtonText('Add Task');
  }

  const getAllTasks = () => {
    axios.get('/tasks').then((res) => {
      dispatch(setLoading(true));
      try {
        if (res.data.success) {
          dispatch(setLoading(false));
          dispatch(setTasks(res.data.tasks))
        }
      } catch (error) {
        dispatch(setLoading(false));
      }
    });
  }

  const addTask = () => {
    if (taskName === '' || taskDescription === '') return;
    const task = {
      taskName,
      description: taskDescription,
      completed: false,
      user
    }
    try {
      dispatch(setLoading(true));
      axios.post('/tasks/new', task).then((res) => {
        if (res.data.sucess) {
          dispatch(setLoading(false));
          setTasks(res.data.tasks);
          defaultState();
          getAllTasks();
        } else dispatch(setLoading(false));
      })
    } catch (error) {
      dispatch(setLoading(false));
    }
  }

  const updateTask = (id, completed) => {
    if (taskName === '' || taskDescription === '') return;
    const task = {
      taskName,
      description: taskDescription,
      completed: completed,
      user
    }
    console.log(task)
    // axios.put(`/tasks/${id}`, task).then((res) => {
    //   try {
    //     dispatch(setLoading(true));
    //     if (res.data.success) {
    //       dispatch(setLoading(false));
    //       getAllTasks();
    //       defaultState();
    //     }
    //   } catch (error) {
    //     dispatch(setLoading(false));
    //   }
    // })
  }

  const handleEdit = (id, checked) => {
    const task = tasks?.find((t) => t._id === id)
    setTaskName(task?.taskName);
    setTaskDescription(task?.description);
    updateTask(id, checked);
    setButtonText('Update Task');
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      axios.delete((`/tasks/${id}`)).then((res) => {
        try {
          dispatch(setLoading(true));
          if (res.data.success) {
            dispatch(setLoading(false));
            getAllTasks();
          }
        } catch (error) {
          dispatch(setLoading(false));
        }
      });
    }
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const toggleAccordion = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    !loading && <>
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
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Add a task"
            />
          </div>
          <div className="addDescription">
            <textarea
              type='text'
              name='taskDescription'
              value={taskDescription || ''}
              placeholder='Provide description of task'
              onChange={(e) => setTaskDescription(e.target.value)}
              cols={65}
            />
          </div>
          {buttonText === 'Add Task' && <button className="c-button" onClick={addTask}>
            <span className="c-main">
              <span className="c-ico"><span className="c-blur"></span> <span className="ico-text">+</span></span>
              {buttonText}
            </span>
          </button>}
          {buttonText === 'Update Task' && <button className="c-button" onClick={handleEdit}>
            <span className="c-main">
              <span className="c-ico"><span className="c-blur"></span> <span className="ico-text">+</span></span>
              {buttonText}
            </span>
          </button>}
          <div className='task'>
            <div>
              {items.map((item) => (
                <div key={item.id + '1'} className={`task-item ${item.isOpen ? 'open' : ''}`}>
                  <div className="task-header" >
                    <div className='todo-actions'>
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          onChange={() => handleChange(item.completed)}
                          value={item.completed}
                        />
                        <SVG />
                      </div>
                      <span>{item?.taskName}</span>
                    </div>
                    <div className='todo-actions'>
                      <button className="btn" onClick={() => handleEdit(item._id, checked)}>
                        <BorderColorOutlinedIcon />
                      </button>
                      <button className="btn" onClick={() => handleDelete(item._id)}>
                        <DeleteForeverOutlinedIcon />
                      </button>
                      <button className='btn' onClick={() => toggleAccordion(item._id)}>
                        {!item.isOpen && <ExpandMoreOutlinedIcon />}
                        {item.isOpen && <ExpandLessOutlinedIcon />}
                      </button>
                    </div>
                  </div>
                  {item.isOpen && (
                    <div className="task-content" key={item.id}>
                      <input
                        type='text'
                        className='addInput w-100'
                        value={item.description || ''}
                        onChange={() => console.log()}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='line'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tasks


export const SVG = () => {
  return <svg viewBox="0 0 35.6 35.6">
    <circle r="17.8" cy="17.8" cx="17.8" className="background"></circle>
    <circle r="14.37" cy="17.8" cx="17.8" className="stroke"></circle>
    <polyline points="11.78 18.12 15.55 22.23 25.17 12.87" className="check"></polyline>
  </svg>
}