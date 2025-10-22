import { useState } from 'react'
import Form from './Form'
import DiaryEntry from './DiaryEntry'

function App() {
  const [currentView, setCurrentView] = useState('form')

  return (
    <div className="App">
      <nav style={{ marginBottom: '30px', textAlign: 'center' }}>
        <button 
          onClick={() => setCurrentView('form')}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: currentView === 'form' ? '#4299e1' : '#e2e8f0',
            color: currentView === 'form' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          User Sign-Up
        </button>
        <button 
          onClick={() => setCurrentView('diary')}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: currentView === 'diary' ? '#4299e1' : '#e2e8f0',
            color: currentView === 'diary' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Diary Entry
        </button>
      </nav>
      
      {currentView === 'form' ? <Form /> : <DiaryEntry />}
    </div>
  )
}

export default App