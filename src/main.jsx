import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Todolist from './TodoList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='d-flex-row mt-4 hm'>
    <Todolist />
    </div>
  </StrictMode>,
)
