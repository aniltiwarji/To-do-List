import { useState } from 'react'
import './App.css'


function App() {

  const [task, setTask] = useState("")                    //input value
  const [tasks, setTasks] = useState([])

  const [editStart, setEditStart] = useState(false)
  const [editItemId, setEditItemId] = useState("")


  //new task adding in setTask array   
  function handleAdd() {
    if (task.trim() === "") {
      alert("Please enter a task")
      return
    }
    if (editStart) {

      let filterData = tasks.map((item) => item.id === editItemId ? item.text = task : item)

      console.log(filterData)
      setEditItemId("")
      setEditStart(true)

    } else {

      setTasks((prev) =>
        [...prev, {

          id: Date.now(),
          text: task,
          completed: false
        }]
      )
    }

    //changing input value to empty
    setTask("")
  }



  function handleDelete(id) {
    // console.log(id)
    let filterData = tasks.filter((item) => item.id !== id)
    setTasks(filterData)
  }



  function handleEdit(id, text) {
    setEditStart(true)
    setEditItemId(id)
    setTask(text)
    // let filterData = tasks.filter((item) => item.id == id )
  }


  function handleComplete(id) {

    setTasks(tasks.map((task) => {
      return task.id === id ? { ...task, completed: !task.completed } : task
    }
    ))

  }


  return (

    <div className='todo-app'>

      <div className='todo-container'>
        <h1>𝕨𝕖𝕝𝕔𝕠𝕞𝕖 𝕋𝕆 𝕄𝕐 𝕋𝕆𝔻𝕆 𝕃𝕀𝕊𝕋 </h1>

        <div>
          <input type='text' placeholder='enter your task' onChange={(e) => setTask(e.target.value.toUpperCase())} value={task} />
          <button onClick={handleAdd}>Add</button>
        </div>


        {/* task list dropdown */}
        <div className='dropdown-list' style={{ border: "1px solid #ccc", padding: "7px", borderRadius: "0.7rem", background: "white", justifyContent: "space-between", }}>

          {
            (tasks.length === 0) ?
              <p style={{ color: "red" }}>No task yet. Add your task</p> :

              tasks.map((item) => {
                return (
                  <p className={`${item.completed ? "task-completed" : ""}`}
                    id="list" key={item.id} style={{
                      fontFamily: "monospace",
                      color: "black", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                      marginRight: "1.1rem"
                    }} >
                    <span style={{
                      width: "30%",
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                      border: "none",
                      display: "block", scrollbarWidth
                        : "none"
                    }}>
                      {item.text}
                    </span>

                    <div style={{
                      boxSizing: "border-box", marginLeft: "1.1rem", marginRight: "1.1rem",
                      color: "white", display: "flex", gap: "0.5rem", height: "100%", alignItems: "center", margin: "auto"
                    }}>

                      <span onClick={() => handleDelete(item.id)} style={{ backgroundColor: "red", marginRight: "0.5rem", border: "none" }}>delete</span>
                      <span onClick={() => handleEdit(item.id, item.text)} style={{ backgroundColor: "blue", marginRight: "0.5rem", border: "none" }}>edit</span>
                      <span onClick={() => handleComplete(item.id)} style={{ backgroundColor: "green", border: "none" }}> {item.completed ? "completed" : "not completed"} </span>
                    </div>
                  </p>
                )
              })
          }

        </div>


      </div>

      <style jsx> {`
       body{
       background-image: linear-gradient(to right, #f8cdda,rgb(117, 134, 204));
       background-size: cover;
       background-attachment: fixed;
       background-position: center;
       height: 100vh;
       display: flex;
       justify-content: center;
       align-items: center;
       font-family: 'Courier New', Courier, monospace;
       color: #fff;
       margin: 0;
       padding: 0;
       }

       .todo-app{
       width: 600px;
       margin: auto;
       background-image: linear-gradient(to right, #f8cdda,rgb(117, 134, 204));
       padding: 2rem;
       border-radius: 0.6rem;
       box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       backdrop-filter: blur(10px);

       }

        h1{
        padding: 1rem;
        border-radius: 0.6rem;
        }

        #list{
         display: flex;
         justify-content: space-between;
         font-size: 1.1rem
        }
       input{
        width: 70%;
        padding: 0.5rem;
        padding-left: 1rem;
        border: none;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        font-size: 1rem;
        }
        span{
        border: 1px solid black;
        padding: 3px 10px;
        border-radius: 0.5rem;
        cursor: pointer
        }
        
        button{
         padding: 0.6rem 1rem;
         border: 1px solid #ccc;
         border-radius: 0.5rem;
         background-color: transparent;
         color: white;
         cursor: pointer;
         font-size: 1rem;
         margin-left: 1rem;
        }
        button:hover{
         background-color:rgb(15, 228, 100);
         transition: 0.3s ease-in-out
         
        }

        .task-completed{
         opacity: 0.6;
         text-decoration:  line-through
         
        }
       `
      }
      </style>
    </div>
  )
}

export default App