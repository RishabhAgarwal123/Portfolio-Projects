import React, { useState } from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

const Task = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Section 1', content: 'Content for Section 1', isOpen: false },
    { id: 2, title: 'Section 2', content: 'Content for Section 2', isOpen: false },
    { id: 3, title: 'Section 3', content: 'Content for Section 3', isOpen: false },
  ]);

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const toggleAccordion = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  const handleEdit = (id) => {
    console.log(`Edit item with ID ${id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

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
                <span>{item.title}</span>
              </div>
              <div className='todo-actions'>
                <button className="btn" onClick={() => handleEdit(item.id)}>
                  <BorderColorOutlinedIcon />
                </button>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  <DeleteForeverOutlinedIcon />
                </button>
                <button className='btn' onClick={() => toggleAccordion(item.id)}>
                  {!item.isOpen && <ExpandMoreOutlinedIcon />}
                  {item.isOpen && <ExpandLessOutlinedIcon />}
                </button>
              </div>
            </div>
            {item.isOpen && (
              <div className="task-content">
                <p>{item.content}</p>
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