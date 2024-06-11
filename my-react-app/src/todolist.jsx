import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faCheck } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  function handleInput(event) {
    setNewTask(event.target.value);
  }

  function addNewTask() {
    if (newTask.trim() !== "") {
      setTasks(function (t) {
        return [...t, newTask];
      });
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter(function (_, i) {
      return i !== index;
    });
    setTasks(updatedTasks);
  }

  function moveUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      var temp = updatedTasks[index];
      updatedTasks[index] = updatedTasks[index - 1];
      updatedTasks[index - 1] = temp;
      setTasks(updatedTasks);
    }
  }

  function editTask(index) {
    setEditIndex(index);
    setShowModal(true);
    setInputValue(tasks[index]);
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleCloseModal() {
    if (inputValue.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = inputValue;
      setTasks(updatedTasks);
    }
    setShowModal(false);
    setInputValue('');
    setEditIndex(null);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (showModal) {
        handleCloseModal();
      } else {
        addNewTask();
      }
    }
  }
  return (
    <div id='todo-list'>
      <div id='box'>
        <h1>TO DO LIST</h1>
        <input
          type="text"
          value={newTask}
          placeholder="Enter Your Task..."
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
        <button id="add-button" onClick={addNewTask}>
          Add
        </button>
        <ol>
          {tasks.map(function (task, index) {
            return (
              <li key={index}>
                <span id="text">{task}</span>
                <button className="edit-button" onClick={editTask.bind(null, index)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="moveup-button" onClick={moveUp.bind(null, index)}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button className="delete-button" onClick={deleteTask.bind(null, index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <input
              id='editin'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Edit Task"
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;