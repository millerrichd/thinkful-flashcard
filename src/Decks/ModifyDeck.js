import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { readDeck } from "../utils/api";

function ModifyDeck() {
  const [deck, setDeck] = useState({})
  const {deckId} = useParams();

  useEffect(() => {
    if(deckId) {
      setDeck([]);
      async function GetDeck() {
        const data = await readDeck(deckId);
        setDeck(data);
      }
      GetDeck();
      return () => {
        console.log("cleanup inside Deck");
      }
    }
  }, [])

  const handleChange = () => {

  }

  const handleCancel = () => {
    console.log("Hi I'm Cancel");
  }

  const handleSubmit = () => {
    console.log("Hi I'm Submit");
  }

  return (
    <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            { deckId ? (
              <>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
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
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" rows="5"/>
        </div>
        <button type="reset" className="btn btn-secondary mr-1" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary ml-1">Submit</button>
      </form>
    </>
  )
}

export default ModifyDeck;
