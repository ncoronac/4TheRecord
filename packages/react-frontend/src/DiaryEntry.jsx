import { useState } from "react";
import "./DiaryEntry.css";
import TrackerContainer from "./TrackerContainer";
import { Link } from "react-router-dom";

function DiaryEntry(props) {
    const [entry, setEntry] = useState({
        date: "",
        title: "",
        content: "",
        mood: "",
        images: [], // Array to store uploaded images
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setEntry({ ...entry, [name]: value });
    }

    function handleImageUpload(event) {
        const files = Array.from(event.target.files);

        const imagePreviews = files.map((file) => ({
            file: file,
            preview: URL.createObjectURL(file),
        }));

        setEntry({
            ...entry,
            images: [...entry.images, ...imagePreviews],
        });
    }

    function removeImage(index) {
        const updatedImages = entry.images.filter((_, i) => i !== index);
        URL.revokeObjectURL(entry.images[index].preview);
        setEntry({ ...entry, images: updatedImages });
    }

    function submitForm(event) {
        event.preventDefault();

        // Create FormData for file uploads
        const formData = new FormData();
        formData.append("date", entry.date);
        formData.append("title", entry.title);
        formData.append("content", entry.content);
        formData.append("mood", entry.mood);

        // Append all image files
        entry.images.forEach((image) => {
            formData.append("images", image.file);
        });

        props.handleSubmitEntry(formData);

        // Clean up object URLs
        entry.images.forEach((image) => URL.revokeObjectURL(image.preview));

        // Reset form
        setEntry({ date: "", title: "", content: "", mood: "", images: [] });
    }

    const trackers = [
        {
            title: "Mood Tracker",
            icons: [
                { text: "😆", num: 5 },
                { text: "😊", num: 4 },
                { text: "😐", num: 3 },
                { text: "☹️", num: 2 },
                { text: "😡", num: 1 },
            ],
        },
        {
            title: "Stress Tracker",
            icons: [
                { text: "☀️", num: 5 },
                { text: "⛅️", num: 4 },
                { text: "🌧️", num: 3 },
                { text: "🌩️", num: 2 },
                { text: "🌪️", num: 1 },
            ],
        },
        {
            title: "Energy Tracker",
            icons: [
                { text: "🔋", num: 3 },
                { text: "👍", num: 2 },
                { text: "🪫", num: 1 },
            ],
        },
        {
            title: "Anxiety Tracker",
            icons: [
                { text: "😄", num: 5 },
                { text: "😬", num: 4 },
                { text: "🫠", num: 3 },
                { text: "😓", num: 2 },
                { text: "😣", num: 1 },
            ],
        },
    ];

    return (
        <div className="page-container">
            {/* Left Side — Diary Entry */}
            <div className="diary-container">
                <Link to="/DailyView">
                    <p>&#8592; Back</p>
                </Link>

                <h1>My Diary</h1>
                <form onSubmit={submitForm}>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={entry.date}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={entry.title}
                        onChange={handleChange}
                        placeholder="What's on your mind?"
                        required
                    />

                    <label htmlFor="content">Your Thoughts</label>
                    <textarea
                        name="content"
                        id="content"
                        value={entry.content}
                        onChange={handleChange}
                        placeholder="Write about your day..."
                        rows="6"
                        required
                    />

                    {/* Image Upload */}
                    <label htmlFor="images">Upload Images</label>
                    <input
                        type="file"
                        name="images"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    {/* Image Previews */}
                    {entry.images.length > 0 && (
                        <div className="image-previews">
                            <h4>Image Previews:</h4>
                            <div className="preview-container">
                                {entry.images.map((image, index) => (
                                    <div key={index} className="image-preview">
                                        <img
                                            src={image.preview}
                                            alt={`Preview ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button type="submit">Save Entry</button>
                </form>

                {entry.title && (
                    <div className="entry-preview">
                        <h3>Preview: {entry.title}</h3>
                        <p>
                            <strong>Date:</strong> {entry.date}
                        </p>
                        <p>
                            <strong>Mood:</strong> {entry.mood}
                        </p>
                        <p>
                            <strong>Content:</strong> {entry.content}
                        </p>
                    </div>
                )}
            </div>

            {/* Right Side — Mood Tracker */}
            <div className="mood-tracker">
                <div>
                    {trackers.map((tracker, index) => (
                        <TrackerContainer
                            key={index}
                            title={tracker.title}
                            icons={tracker.icons}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DiaryEntry;
