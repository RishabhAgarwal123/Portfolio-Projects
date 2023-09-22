import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Task from './Task';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setTasks } from '../redux/reducer';

const Tasks = () => {
  const dispatch = useDispatch();
  const { user, loading, tasks } = useSelector(state => state.user);
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
    axios.put(`/tasks/${id}`, task).then((res) => {
      try {
        dispatch(setLoading(true));
        if (res.data.success) {
          dispatch(setLoading(false));
          getAllTasks();
          defaultState();
        }
      } catch (error) {
        dispatch(setLoading(false));
      }
    })
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
          <button className="c-button" onClick={addTask}>
            <span className="c-main">
              <span className="c-ico"><span className="c-blur"></span> <span className="ico-text">+</span></span>
              {buttonText}
            </span>
          </button>
          <div className='task'>
            <Task handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Tasks