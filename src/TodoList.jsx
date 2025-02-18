import "./todolist.css";
import {
  faPlus,
  faTrashCan,
  faCheck,
  faPenToSquare,
  faGear,
  faSave,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {Modal} from "react-bootstrap";


export default function Todolist() {
  const [show, setShow] = useState(false);
  const [colors, setColors] = useState({
    body_bg_color: "#2e6fd1",
      header_bg_color: "#15448b",
      task_bg_color: "#00008b",
      font_color: "white",
      input_font_color: "black"
  });
  const [newTask, setNewTask] = useState({
    text: "",
    checked: false,
    openEdit: false,
  });
  const [tasks, setTasks] = useState([
    { text: "Walk the dog", checked: false, openEdit: false },
    { text: "Go to work", checked: false, openEdit: false },
  ]);
const  [activeButton, setActiveButton] = useState(1);


  const teme = {
    tema1: {
      body_bg_color: "#2e6fd1",
      header_bg_color: "#15448b",
      task_bg_color: "#00008b",
      font_color: "white",
      input_font_color: "black"
    },
    tema2: {
      body_bg_color: "#a5d6a7",
      header_bg_color: "#388e3c",
      task_bg_color: "#c8e6c9",
      font_color: "#1b421e",
      input_font_color: "white"
    },
  };

  useEffect(() => {
    const storedColors = localStorage.getItem("tema");
    if (storedColors) {
      const parsedColors = JSON.parse(storedColors);
      setColors(parsedColors);
      Object.keys(parsedColors).forEach((key) => {
        document.documentElement.style.setProperty(
          `--${key.replace(/_/g, "-")}`,
          parsedColors[key]
        );
      });
    }
    else {
      localStorage.setItem("tema", JSON.stringify(colors));
    }
  }, []);

  function onClickThemeChange({tema, button}) {
    const newColors = tema;
    setColors(newColors);
    
    setActiveButton(button);
      
  }

  function handleInputChange(e) {
    setNewTask({ text: e.target.value, checked: false });
  }

  function HandleAdd() {
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setNewTask({ text: "", checked: false });
  }

  function onChangeCheck(index) {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  }

  function onClickDelete(index) {
    const newTasks = tasks.filter((task, i) => i !== index);

    setTasks(newTasks);
  }

  function onClickOpenEdit(index) {
    const newTasks = [...tasks];
    for (let i = 0; i < newTasks.length; i++) {
      newTasks[i].openEdit = false;
    }
    newTasks[index].openEdit = true;
    setTasks(newTasks);
  }

  function onClickConfirmEdit(index) {
    const newTasks = [...tasks];

    newTasks[index].text = newTasks[index].text;

    newTasks[index].openEdit = false;
    setTasks(newTasks);
  }

  function onClickDeleteAll() {
    const newTasks = [];
    setTasks(newTasks);
  }

  const handleSave = () => {
    localStorage.setItem("tema", JSON.stringify(colors));
    Object.keys(colors).forEach((key) => {
      document.documentElement.style.setProperty(
        `--${key.replace(/_/g, "-")}`,
        colors[key]
      );
      
    });
  };
  

  return (
    <div className="custom-area">
      <div className="custom-to-do-list">
        <div className="custom-header">
          <div className="ms-4">
           <button className="icon-button border border-0 bg-transparent" onClick={() => setShow(true)}>
           <FontAwesomeIcon icon={faGear} size="2xl" />
           </button>
              
          <Modal
            show={show}
            onHide={() => setShow(false)}
            
            animation={true}
            backdrop="static"
            centered
            dialogClassName="custom-modal-dialog"
            style={{ overflow: "auto"}}
            scrollable={true}>
            <Modal.Header>
              <Modal.Title>Settings</Modal.Title>
              <div className="d-flex ms-auto align-items-center ">
              <button onClick={handleSave} className=" bg-transparent border-0 modal-button">
              <FontAwesomeIcon icon={faSave} size="lg" />
              </button>
              <button onClick={() => setShow(false)} className=" bg-transparent border-0  modal-button">
              <FontAwesomeIcon icon={faClose} size="xl" />
              </button>
              </div>
             
            </Modal.Header>
            <Modal.Body>
              
            <div className="Custom-theme">
              Izberi temo:
              <div className="theme-colors">
              <button
             
                className="theme-button"
                style={{backgroundImage: `linear-gradient(to right,${teme.tema1.body_bg_color},  ${teme.tema1.body_bg_color} 50%, ${teme.tema1.header_bg_color} 50%, ${teme.tema1.header_bg_color})`,
                        boxShadow: activeButton === 1 ? "0 0 5px 5px darkblue" : ""}}    
                onClick={() => onClickThemeChange({tema: teme.tema1, button: 1})}
                ></button>
                <button
              
                className="theme-button"
                style={{backgroundImage: `linear-gradient(to right,${teme.tema2.body_bg_color},  ${teme.tema2.body_bg_color} 50%, ${teme.tema2.header_bg_color} 50%, ${teme.tema2.header_bg_color})`,
                        boxShadow: activeButton === 2 ? "0 0 5px 5px green" : ""}}
                onClick={() => onClickThemeChange({tema: teme.tema2, button: 2})}
                ></button>
                </div>
            </div>

            </Modal.Body>
            

          </Modal>

           
          </div>
          <h1 className="custom-naslov"> To-do-list</h1>
          <div className="custom-counter">
            Tasks Done <br></br> {tasks.filter((task) => task.checked).length} /{" "}
            {tasks.length}
          </div>
        </div>

        <div className="custom-body">
          <div className="input-wrap border border-2 border-black rounded-3 p-2">
            <input
              className="custom-input"
              type="text"
              placeholder="add new task..."
              value={newTask.text}
              maxLength={30}
              onChange={handleInputChange}
            />
            <button
              className="add-button float-end icon-button"
              onClick={HandleAdd}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {tasks.length !== 0 ? (
            <div className={`custom-list d-flex-column text-start `}>
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`custom-task d-flex-row ${
                    task.checked ? "text-decoration-line-through" : ""
                  }`}
                  style={{ backgroundColor: task.checked ? "#00008b20" : "" }}
                >
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={task.checked}
                    onChange={() => onChangeCheck(index)}
                  />
                  {task.openEdit ? (
                    <input
                      className="edit-input"
                      autoFocus={true}
                      focus
                      maxLength={30}
                      style={{ width: `${(task.text.length + 1) * 10}px` }}
                      value={task.text}
                      onChange={(e) => {
                        const newTasks = [...tasks];

                        newTasks[index].text = e.target.value;
                        setTasks(newTasks);
                      }}
                    />
                  ) : (
                    task.text
                  )}

                  <button
                    className="float-end bg-transparent p-0 border-0 me-1 icon-button"
                    onClick={() => onClickDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  {!task.openEdit ? (
                    <button
                      className="float-end bg-transparent p-0 border-0 me-1 icon-button"
                      onClick={() => onClickOpenEdit(index)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  ) : (
                    <button
                      className="float-end bg-transparent p-0 border-0 me-1 icon-button"
                      onClick={() => onClickConfirmEdit(index)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {tasks.length === 0 ? (
            <p className="text-center pt-5">No tasks</p>
          ) : (
            <button
              className="deleteall-button"
              onClick={() => onClickDeleteAll()}
            >
              Delete all
            </button>
          )}
          <div className="custom-footer">copyright @2025 | made by Chizzy</div>
        </div>
      </div>
    </div>
  );
}
