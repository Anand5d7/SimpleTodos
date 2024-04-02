import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todoList: [
      {
        id: 1,
        title: 'Book the ticket for today evening',
        completed: false,
      },
      {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
        completed: false,
      },
      {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
        completed: false,
      },
      {
        id: 4,
        title: 'Drop the parcel at Bloomingdale',
        completed: false,
      },
      {
        id: 5,
        title: 'Order fruits on Big Basket',
        completed: false,
      },
      {
        id: 6,
        title: 'Fix the production issue',
        completed: false,
      },
      {
        id: 7,
        title: 'Confirm my slot for Saturday Night',
        completed: false,
      },
      {
        id: 8,
        title: 'Get essentials for Sunday car wash',
        completed: false,
      },
    ],
    newTodoTitle: '',
    newTodoCount: 1,
    editingTodoId: null,
  }

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  addTodo = () => {
    const {newTodoTitle} = this.state
    const trimmedTitle = newTodoTitle.trim()

    if (trimmedTitle === '') {
      return // If input is empty, do nothing
    }

    const matches = trimmedTitle.match(/(.+?)(\d+)$/)

    if (matches) {
      const title = matches[1].trim()
      const count = parseInt(matches[2])

      if (!isNaN(count) && count > 0) {
        const newTodos = Array.from({length: count}, (_, index) => ({
          id: Date.now() + index,
          title: title,
          completed: false,
        }))

        this.setState(prevState => ({
          todoList: [...prevState.todoList, ...newTodos],
          newTodoTitle: '',
        }))
      }
    } else {
      const newTodo = {
        id: Date.now(),
        title: trimmedTitle,
        completed: false,
      }

      this.setState(prevState => ({
        todoList: [...prevState.todoList, newTodo],
        newTodoTitle: '',
      }))
    }
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }))
  }

  toggleEditing = id => {
    this.setState({editingTodoId: id})
  }

  saveEditedTitle = (id, newTitle) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo => {
        if (todo.id === id) {
          return {...todo, title: newTitle}
        }
        return todo
      }),
      editingTodoId: null,
    }))
  }

  toggleCompletion = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo => {
        if (todo.id === id) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      }),
    }))
  }

  render() {
    const {todoList, newTodoTitle, newTodoCount} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              onChange={this.handleInputChange}
              className="text-field"
              placeholder="Enter todo title"
            />
            <input
              type="number"
              name="newTodoCount"
              value={newTodoCount}
              onChange={this.handleInputChange}
              className="input-checkbox"
              placeholder="Enter count"
            />
            <button type="button" className="add-btn" onClick={this.addTodo}>
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todoList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleEditing={this.toggleEditing}
                saveEditedTitle={this.saveEditedTitle}
                toggleCompletion={this.toggleCompletion}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
