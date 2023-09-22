import React, { useEffect, useState } from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setTasks } from '../redux/reducer';
import axios from 'axios';
const Task = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.user);
  const [items, setItems] = useState(tasks);

  const [checked, setChecked] = useState(false);

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

  const handleEdit = (id) => {
    console.log(`Edit item with ID ${id}`);
  };

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
    setItems(tasks);
  }, [tasks])

  return (
    <>
      <div>
        {items.map((item) => (
          <div key={item.id} className={`task-item ${item.isOpen ? 'open' : ''}`}>
            <div className="task-header" >
              <div className='todo-actions'>
                <div className="checkbox-wrapper">
                  <input type="checkbox" />
                  <SVG />
                </div>
                <span>{item?.taskName}</span>
              </div>
              <div className='todo-actions'>
                <button className="btn" onClick={() => handleEdit(item._id)}>
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
    </>
  );
};

export default Task;

export const SVG = () => {
  return <svg viewBox="0 0 35.6 35.6">
    <circle r="17.8" cy="17.8" cx="17.8" className="background"></circle>
    <circle r="14.37" cy="17.8" cx="17.8" className="stroke"></circle>
    <polyline points="11.78 18.12 15.55 22.23 25.17 12.87" className="check"></polyline>
  </svg>
}