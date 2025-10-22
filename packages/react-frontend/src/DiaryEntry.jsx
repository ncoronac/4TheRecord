import { useState } from 'react'

function DiaryEntry() {
  const [entry, setEntry] = useState({
    date: "",
    title: "",
    content: "",
    mood: ""
  })

  function handleChange(event) {
    const { name, value } = event.target;
    setEntry({...entry, [name]: value})
  }

  function handleMoodSelect(mood) {
    setEntry({...entry, mood: mood})
  }

  function submitForm(event) {
    event.preventDefault();
    console.log("Diary Entry Submitted: ", entry);
  }

  return (
    <div className="container">
      <h1>My Diary</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="date">Date</label>
        <input
          type="date" 
          name='date' 
          id="date" 
          value={entry.date} 
          onChange={handleChange} 
          required
        />

        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          name='title' 
          id="title" 
          value={entry.title} 
          onChange={handleChange} 
          placeholder="What's on your mind?"
          required
        />

        <label>How are you feeling today?</label>
        <div className="mood-selector">
          {['😊 Happy', '😔 Sad', '😄 Excited', '😴 Tired', '😐 Neutral'].map((mood) => (
            <button
              key={mood}
              type="button"
              className={`mood-option ${entry.mood === mood ? 'selected' : ''}`}
              onClick={() => handleMoodSelect(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <label htmlFor="content">Your Thoughts</label>
        <textarea
          name='content'
          id="content"
          value={entry.content}
          onChange={handleChange}
          placeholder="Write about your day..."
          rows="6"
          required
        />

        <button type='submit'>Save Entry</button>
      </form>

      {entry.title && (
        <div className="entry-preview">
          <h3>Preview: {entry.title}</h3>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Mood:</strong> {entry.mood}</p>
          <p><strong>Content:</strong> {entry.content}</p>
        </div>
      )}
    </div>
  )
}

export default DiaryEntry