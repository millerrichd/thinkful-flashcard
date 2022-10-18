import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { createDeck, readDeck, updateDeck } from "../utils/api";

function ModifyDeck() {
  const initialDeck = {
    name: "Enter Name",
    description: "Enter Description"
  }
  const [formData, setFormData] = useState({})
  
  const {deckId} = useParams();
  const history = useHistory();

  useEffect(() => {
    if(deckId) {
      setFormData({});
      async function GetDeck() {
        const data = await readDeck(deckId);
        setFormData(data);
      }
      GetDeck();
      return () => {
        console.log("cleanup inside Deck");
      }
    }
  }, [deckId])

  const handleChange = ({target}) => {
    setFormData({ ...formData, [target.name]: target.value})
  }

  const handleCancel = () => {
    if(deckId) {
      history.push(`/decks/${deckId}`)
    } else {
      history.push("/");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(deckId) {
      await updateDeck(formData)
      setFormData({...initialDeck})
      history.push(`/decks/${deckId}`)
    } else {
      await createDeck(formData)
      setFormData({...initialDeck})
      history.push("/");
    }
  }

  return (
    <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            { deckId ? (
              <>
                <li className="breadcrumb-item"><Link to={`/decks/${formData.id}`}>{formData.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
              </>
            ) : (
              <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            )}
          </ol>
        </nav>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" type="text" name="name" onChange={handleChange} value={formData.name}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" name="description" rows="5" onChange={handleChange} value={formData.description}/>
        </div>
        <button type="reset" className="btn btn-secondary mr-1" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary ml-1">Submit</button>
      </form>
    </>
  )
}

export default ModifyDeck;
