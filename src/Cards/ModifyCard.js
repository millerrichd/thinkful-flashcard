import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { readDeck, readCard, updateCard, createCard } from "../utils/api";

function ModifyCard() {
  const initialForm = {front: "", back: ""}
  const [formData, setFormData] = useState(initialForm);
  const [deck, setDeck] = useState({});
 
  const {deckId, cardId} = useParams();
  const history = useHistory();

  useEffect(() => {
    if(deckId) {
      setDeck({});
      async function GetDeck() {
        const data = await readDeck(deckId);
        setDeck(data);
      }
      GetDeck();
      return () => {
      }
    }
  }, [deckId])

  useEffect(() => {
    if(cardId) {
      setFormData({});
      async function GetCard() {
        const data = await readCard(cardId);
        setFormData(data);
      }
      GetCard();
      return () => {
      }
    }
  }, [cardId])


  const handleChange = ({target}) => {
    setFormData({ ...formData, [target.name]: target.value})
  }

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Hi I'm Card Submit")
    if(cardId) {
      console.log("inside update");
      await updateCard(formData)
      setFormData(initialForm)
      history.push(`/decks/${deckId}`);
    } else {
      console.log("inside create");
      await createCard(deckId, formData)
      console.log("before form reset");
      setFormData(initialForm)
      console.log("after form reset");
    }
  }

  return (
    <>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        { cardId ? (
          <>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
          </>
        ) : (
          <>
            <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
          </>
        )}
      </ol>
    </nav>
    { cardId ? (
      <h2>Edit Card</h2>
    ) : (
      <h2>{deck.name}: Add Card</h2>
    )}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea className="form-control" id="front" name="front" rows="2" onChange={handleChange} value={formData.front}/>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea className="form-control" id="back" name="back" rows="2" onChange={handleChange} value={formData.back}/>
      </div>
      { cardId ? (
        <button type="reset" className="btn btn-secondary mr-1" onClick={handleCancel}>Cancel</button>
      ) : (
        <button type="reset" className="btn btn-secondary mr-1" onClick={handleCancel}>Done</button>
      )}      
      <button type="submit" className="btn btn-primary ml-1">Submit</button>
    </form>
  </>
  )
}

export default ModifyCard;