import React, { useState } from 'react'
import '../component/todo.css'

function Todo() {
  let [text, setText] = useState("")
  let [task, setTask] = useState([
    { id: 1, label: "wakeup", check: false },
    { id: 2, label: "eat", check: true },
  ])

  let [filteredTask, setFilteredTask] = useState(task)
  let [edit, setEdit] = useState(false)
  let [newId, setId] = useState(null)

  // Add or Save task
  let handleAddOrSave = () => {
    if (edit) {
      let updatedTasks = task.map((tsk) =>
        tsk.id === newId ? { ...tsk, label: text } : tsk
      )
      setTask(updatedTasks)
      setFilteredTask(updatedTasks)
      setText("")
      setEdit(false)
      setId(null)
    } else {
      if (text.trim() === "") return
      let newTaskList = [
        ...task,
        { id: task.length + 1, label: text, check: false }
      ]
      setTask(newTaskList)
      setFilteredTask(newTaskList)
      setText("")
    }
  }

  // Delete task
  let handleDelete = (id) => {
    let newTask = task.filter((tsk) => tsk.id !== id)
    setTask(newTask)
    setFilteredTask(newTask)
  }

  // Update task
  let handleUpdate = (id) => {
    let updateTask = task.find((tsk) => tsk.id === id)
    setText(updateTask.label)
    setId(id)
    setEdit(true)
  }

  // Check/Uncheck
  let handleCheck = (id) => {
    let newTask = task.map((tsk) =>
      tsk.id === id ? { ...tsk, check: !tsk.check } : tsk
    )
    setTask(newTask)
    setFilteredTask(newTask)
  }

  // Search tasks
  let findTask = () => {
    if (text.trim() === "") {
      setFilteredTask(task)
    } else {
      let searchResult = task.filter((tsk) =>
        tsk.label.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredTask(searchResult)
    }
  }

  // Refresh to show all
  let handleRefresh = () => {
    setFilteredTask(task)
    setText("")
    setEdit(false)
    setId(null)
  }

  // Keyboard handler
  let handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.ctrlKey || e.shiftKey) {
        // Ctrl+Enter or Shift+Enter = search
        findTask()
      } else {
        // Enter = add or save
        handleAddOrSave()
      }
    }
  }

  return (
    <div>
      <button className='outerBtn' onClick={handleRefresh}>Refresh</button>
      <div className='container'>
        <div className='input-container'>
          <input
            type="text"
            placeholder='Enter text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}   // 🔹 keyboard shortcut
          />
          <button onClick={findTask}>Search</button>
          <button onClick={handleAddOrSave}>
            {edit ? "Save" : "Add"}
          </button>
        </div>
        <div className='list-container'>
          <ul>
            {filteredTask.length > 0 ? (
              filteredTask.map((tsk) => (
                <li key={tsk.id}>
                  <input
                    type="checkbox"
                    checked={tsk.check}
                    onChange={() => handleCheck(tsk.id)}
                  />
                  <label className={tsk.check ? "checked" : ""}>
                    {tsk.label}
                  </label>
                  <button onClick={() => handleUpdate(tsk.id)}>Update</button>
                  <button onClick={() => handleDelete(tsk.id)}>Delete</button>
                </li>
              ))
            ) : (
              <p>No tasks found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Todo
