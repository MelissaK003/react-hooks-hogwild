import React, { useState } from "react";

function Form({ onAddHog }) {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    greased: false,
    weight: "",
    highest_medal_achieved: "",
    image: "" // You might want to use a default image
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new hog with form data
    const newHog = {
      ...formData,
      id: Date.now(), // Generate a unique ID
      weight: Number(formData.weight) // Convert weight to number
    };

    // Pass the new hog to parent component
    onAddHog(newHog);

    // Reset form
    setFormData({
      name: "",
      specialty: "",
      greased: false,
      weight: "",
      highest_medal_achieved: "",
      image: ""
    });

    // Hide form after submission
    setShowForm(false);
  };

  return (
    <div className="ui segment">
      <button 
        className="ui button primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add New Hog"}
      </button>

      {showForm && (
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Specialty:</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Weight (in pounds):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Highest Medal Achieved:</label>
            <input
              type="text"
              name="highest_medal_achieved"
              value={formData.highest_medal_achieved}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Image URL:</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="greased"
                checked={formData.greased}
                onChange={handleChange}
              />
              <label>Greased</label>
            </div>
          </div>

          <button className="ui button positive" type="submit">
            Add Hog
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;