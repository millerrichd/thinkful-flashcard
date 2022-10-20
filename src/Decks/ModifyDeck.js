import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function ModifyDeck() {
  const initialForm = {name: "", description: ""};
  const [formData, setFormData] = useState(initialForm)
  
  const {deckId} = useParams();
  const history = useHistory();

  //get the current deck
  useEffect(() => {
    if(deckId) {
      setFormData({});
      async function GetDeck() {
        const data = await readDeck(deckId);
        setFormData(data);
      }
      GetDeck();
      return () => {
      }
    }
  }, [deckId])

  //cancel out of editing the deck
  const handleCancel = () => {
    history.push(`/decks/${deckId}`)
  }

  //submit the deck and clear the form and change the path
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData)
    setFormData(initialForm)
    history.push(`/decks/${deckId}`)
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${formData.id}`}>{formData.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} setFormData={setFormData} formData={formData}/>
    </>
  )
}

export default ModifyDeck;
