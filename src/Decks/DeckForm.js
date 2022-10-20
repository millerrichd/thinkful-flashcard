import React from "react";

function DeckForm({handleSubmit, handleCancel, formData, setFormData}) {

  // Handle the change of the element to record the new values.
  const handleChange = ({target}) => {
    setFormData({ ...formData, [target.name]: target.value})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" type="text" name="name" onChange={handleChange} defaultValue={formData.name}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="5" onChange={handleChange} defaultValue={formData.description}/>
        </div>
        <button type="reset" className="btn btn-secondary mr-1" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary ml-1">Submit</button>
      </form>
    </>
  )
}

export default DeckForm;
