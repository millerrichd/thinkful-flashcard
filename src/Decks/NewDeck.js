import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function NewDeck() {
  const initialForm = {name: "", description: ""};
  const [formData, setFormData] = useState(initialForm)
  
  const history = useHistory();

  //cancel creating a new entry
  const handleCancel = () => {
    history.push("/");
  }

  //submit the form and change back to home
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createDeck(formData)
    setFormData(initialForm)
    history.push("/");
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <DeckForm handleSubmit={handleSubmit} handleCancel={handleCancel} setFormData={setFormData} formData={formData}/>
    </>
  )
}

export default NewDeck;
