// Write your code here
import {useState} from 'react'
import './index.css'

const TodoItem = ({
  todoDetails,
  deleteTodo,
  toggleEditing,
  saveEditedTitle,
  toggleCompletion,
}) => {
  const {id, title, completed} = todoDetails
  const [editedTitle, setEditedTitle] = useState(title)
  const [isEditing, setIsEditing] = useState(false)

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  const onToggleEditing = () => {
    toggleEditing(id)
    setEditedTitle(title)
    setIsEditing(!isEditing)
  }

  const onSaveEditedTitle = () => {
    saveEditedTitle(id, editedTitle)
    setIsEditing(false)
  }

  const onToggleCompletion = () => {
    toggleCompletion(id)
  }

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        className="checkbox"
        onChange={onToggleCompletion}
      />
      <div className="tittle-text">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            className="save-text"
            onChange={e => setEditedTitle(e.target.value)}
          />
        ) : (
          <p className="title">{title}</p>
        )}
      </div>
      <div>
        {isEditing ? (
          <button
            type="button"
            className="save-btn"
            onClick={onSaveEditedTitle}
          >
            Save
          </button>
        ) : (
          <button type="button" className="edit-btn" onClick={onToggleEditing}>
            Edit
          </button>
        )}
      </div>
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
