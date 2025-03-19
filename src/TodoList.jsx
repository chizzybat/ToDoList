import React, { useEffect, useState } from "react";
import { Modal, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashCan,
  faCheck,
  faPenToSquare,
  faGear,
  faSave,
  faClose,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import confetti from "canvas-confetti";
import "./todolist.css";

export default function Todolist() {
  const [Error, setError] = useState(false);
  const [taskError, setTaskError] = useState(false);  
  const [allChecked, setAllChecked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [show, setShow] = useState(false);
  const [colors, setColors] = useState({
    body_bg_color: "#2e6fd1",
    header_bg_color: "#15448b",
    task_bg_color: "#00008b",
    font_color: "white",
    input_font_color: "black",
    task_done_bg_color: "#3fa14c",
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
  const [activeButton, setActiveButton] = useState(null);
  const [initialValue, setInitialValue] = useState("");

  const teme = {
    tema1: {
      body_bg_color: "#2e6fd1",
      header_bg_color: "#15448b",
      task_bg_color: "#00008b",
      font_color: "white",
      input_font_color: "black",
      task_done_bg_color: "#3fa14c",
      bg_texture:
        "url('https://www.transparenttextures.com/patterns/cubes.png')",
      page_bg_color: "lightblue",
    },
    tema2: {
      body_bg_color: "#a5d6a7",
      header_bg_color: "rgb(79, 179, 84)",
      task_bg_color: "#c8e6c9",
      font_color: "#1b421e",
      input_font_color: "#a5d6a7",
      task_done_bg_color: "#4caf50",
      bg_texture:
        "url('https://www.transparenttextures.com/patterns/batthern.png')",
        page_bg_color:"rgb(220, 253, 221)",
    },
    tema3: {
      body_bg_color: "#FFCC99",
      header_bg_color: "rgb(255, 121, 73)",
      task_bg_color: "#FFE4B5",
      font_color: "#8B0000",
      input_font_color: "#FFCC99",
      task_done_bg_color: "#FF6347",
      bg_texture:
        "url('https://www.transparenttextures.com/patterns/batthern.png')",
        page_bg_color:"rgb(255, 222, 190)",
    },
    tema4: {
      body_bg_color: "#555555",
      header_bg_color: "black",
      task_bg_color: "black",
      font_color: "white",
      input_font_color: "black",
      task_done_bg_color: "#808080",
      bg_texture:
        "url('https://www.transparenttextures.com/patterns/cubes.png')",
        page_bg_color:"rgb(170, 170, 170)",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      if (Error) {
        setError(false);
      }
    }, 1000);
  }, [Error]);

  useEffect(() => {
    setTimeout(() => {
      if (taskError) {
        setTaskError(false);
      }
    }, 1000);
  }, [taskError]);

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
    } else {
      localStorage.setItem("tema", JSON.stringify(colors));
    }
  }, []);

  function onClickThemeChange({ tema, button }) {
    const newColors = tema;
    setColors(newColors);
    setActiveButton(button);
  }

  function handleInputChange(e) {
    if (e.target.value.length !== "") {
      setNewTask({ text: e.target.value, checked: false });
    }
  }

  function HandleAdd() {
    if (newTask.text.length > 0) {
      setError(false);
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      setNewTask({ text: "", checked: false });
    } else {
      setError(true);
    }
  }

  function onChangeCheck(index) {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
    if (newTasks[index].checked) {
      confetti({
        particleCount: 50,
        startVelocity: 20,
        spread: 360,
      });
    }
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
    setInitialValue(newTasks[index].text);
    setTasks(newTasks);
  }

  function onClickConfirmEdit(index) {
    if (tasks[index].text.length === 0) {
      setTaskError(true);
      return;
    }
    const newTasks = [...tasks];
    newTasks[index].text = newTasks[index].text;
    newTasks[index].openEdit = false;
    setTasks(newTasks);
  }

  function onClickDeleteAll() {
    const newTasks = [];
    setTasks(newTasks);
  }

  function onClickCompleteAll() {
    setAllChecked(!allChecked);
    if (!allChecked) {
      const newTasks = [...tasks];
      newTasks.forEach((task) => (task.checked = true));
      setTasks(newTasks);
      confetti({
        spread: 360,
        particleCount: 300,
        startVelocity: 30,
        scalar: 1.2,
        
      });
    }
    if (allChecked) {
      const newTasks = [...tasks];
      newTasks.forEach((task) => (task.checked = false));
      setTasks(newTasks);
    }
  }

  const handleSave = () => {
    setShowToast(true);
    localStorage.setItem("tema", JSON.stringify(colors));
    Object.keys(colors).forEach((key) => {
      document.documentElement.style.setProperty(
        `--${key.replace(/_/g, "-")}`,
        colors[key]
      );
    });
  };

  return (
    <div>
      <div className="custom-area mx-2">
        <div className="custom-to-do-list">
          <div className="custom-header">
            <div className="ms-4">
              <button
                className="icon-button border border-0 bg-transparent"
                onClick={() => setShow(true)}
              >
                <FontAwesomeIcon icon={faPalette} size="2xl" />
              </button>

              <Modal
                show={show}
                onHide={() => setShow(false)}
                animation={true}
                backdrop="static"
                centered
                dialogClassName="custom-modal-dialog"
                style={{ overflow: "auto" }}
                scrollable={true}
              >
                <Modal.Header>
                  <Modal.Title>Themes</Modal.Title>
                  <div className="d-flex ms-auto align-items-center ">
                    <button
                      onClick={handleSave}
                      className=" bg-transparent border-0 modal-button"
                    >
                      <FontAwesomeIcon icon={faSave} size="lg" />
                    </button>
                    <button
                      onClick={() => setShow(false)}
                      className=" bg-transparent border-0  modal-button"
                    >
                      <FontAwesomeIcon icon={faClose} size="xl" />
                    </button>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div className="Custom-theme">
                    <div className="theme-colors d-flex justify-content-around">
                      <button
                        className="theme-button"
                        style={{
                          backgroundImage: `linear-gradient(to right,${teme.tema1.body_bg_color},  ${teme.tema1.body_bg_color} 50%, ${teme.tema1.header_bg_color} 50%, ${teme.tema1.header_bg_color})`,
                          boxShadow:
                            activeButton === 1 ? "0 0 4px 4px darkblue" : "",
                        }}
                        onClick={() =>
                          onClickThemeChange({ tema: teme.tema1, button: 1 })
                        }
                      ></button>
                      <button
                        className="theme-button"
                        style={{
                          backgroundImage: `linear-gradient(to right,${teme.tema4.body_bg_color},  ${teme.tema4.body_bg_color} 50%, ${teme.tema4.header_bg_color} 50%, ${teme.tema4.header_bg_color})`,
                          boxShadow:
                            activeButton === 4 ? "0 0 4px 4px grey" : "",
                        }}
                        onClick={() =>
                          onClickThemeChange({ tema: teme.tema4, button: 4 })
                        }
                      ></button>
                      <button
                        className="theme-button"
                        style={{
                          backgroundImage: `linear-gradient(to right,${teme.tema2.body_bg_color},  ${teme.tema2.body_bg_color} 50%, ${teme.tema2.header_bg_color} 50%, ${teme.tema2.header_bg_color})`,
                          boxShadow:
                            activeButton === 2 ? "0 0 4px 4px green" : "",
                        }}
                        onClick={() =>
                          onClickThemeChange({ tema: teme.tema2, button: 2 })
                        }
                      ></button>
                      <button
                        className="theme-button"
                        style={{
                          backgroundImage: `linear-gradient(to right,${teme.tema3.body_bg_color},  ${teme.tema3.body_bg_color} 50%, ${teme.tema3.header_bg_color} 50%, ${teme.tema3.header_bg_color})`,
                          boxShadow:
                            activeButton === 3 ? "0 0 4px 4px orange" : "",
                        }}
                        onClick={() =>
                          onClickThemeChange({ tema: teme.tema3, button: 3 })
                        }
                      ></button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <h1 className="custom-naslov"> To-Do List</h1>
            <div className="custom-counter">
              Tasks Done <br></br> {tasks.filter((task) => task.checked).length}{" "}
              / {tasks.length}
            </div>
          </div>

          <div className="custom-body">
            <div className="d-flex input-wrap border border-2 border-black rounded-3 py-2 pe-1">
              <div className="d-flex-row flex-grow-1">
                <input
                  className="custom-input"
                  type="text"
                  placeholder={`${
                    Error ? "You need to write something..." : "Enter a task"
                  }`}
                  value={newTask.text}
                  maxLength={25}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      HandleAdd();
                    }
                    if (e.key === "Escape") {
                      setNewTask({ text: "", checked: false });
                    }
                  }}
                />
              </div>
              <div className="d-flex-row">
                <button
                  className="add-button float-end icon-button"
                  onClick={HandleAdd}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            {tasks.length !== 0 ? (
              <div className={`custom-list d-flex-column text-start `}>
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`custom-task d-flex ${
                      task.checked ? "text-decoration-line-through checked-bg" : ""
                    }`}
                  
                  >
                    <label class="me-2 d-flex-row flex-grow-0">
                      <input
                        type="checkbox"
                        className=" custom-checkbox"
                        checked={task.checked}
                        onChange={() => onChangeCheck(index)}
                      />
                      <span class="checkmark mb-1"></span>
                    </label>
                    <div className="d-flex-row flex-grow-1">
                      {task.openEdit ? (
                        <input
                        placeholder={`${
                          taskError ? "You need to write something..." : "Enter new task name..."
                        }`}
                          className="edit-input"
                          autoFocus={true}
                          focus
                          defaultValue={task.text}
                          maxLength={25}
                          value={task.text}
                          onChange={(e) => {
                            const newTasks = [...tasks];
                            newTasks[index].text = e.target.value;
                            setTasks(newTasks);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onClickConfirmEdit(index);
                            }
                            if (e.key === "Escape") {
                              const newTasks = [...tasks];
                              newTasks[index].openEdit = false;
                              newTasks[index].text = initialValue;
                              setTasks(newTasks);
                            }
                          }}
                        />
                      ) : (
                        task.text
                      )}
                    </div>

                    <div className="d-flex-row flex-grow-0">
                      {!task.openEdit ? (
                        <button
                          className="float-end bg-transparent p-0 border-0 me-1 icon-button"
                          onClick={() => onClickOpenEdit(index)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      ) : (
                        <button
                          className="float-end bg-transparent p-0 border-0 me-1 ms-1 icon-button"
                          onClick={() => onClickConfirmEdit(index)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                    </div>
                    <div className="d-flex-row flex-grow-0">
                      <button
                        className="float-end bg-transparent p-0 border-0 me-2 icon-button"
                        onClick={() => onClickDelete(index)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
            {tasks.length === 0 ? (
              <p className="text-center pt-5">No tasks</p>
            ) : (
              <div className="d-flex gap-3">
                <button
                  className="complete-button"
                  onClick={() => onClickCompleteAll()}
                  style={{ backgroundColor: !allChecked ? "green" : "" }}
                >
                  {!allChecked ? "Complete all" : "Uncomplete all"}
                </button>
                <button
                  className="deleteall-button"
                  onClick={() => onClickDeleteAll()}
                >
                  Delete all
                </button>
              </div>
            )}
            <div className="custom-footer">
              copyright @2025 | made by Chizzy
            </div>
          </div>
        </div>
      </div>
      {showToast ? (
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          style={{
            zIndex: 9999,
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "110px",
          }}
        >
          <Toast.Body>theme saved!</Toast.Body>
        </Toast>
      ) : (
        ""
      )}
    </div>
  );
}
