import React, { useState } from "react";
import "./ChemicalApp.css";
import { useDispatch, useSelector } from "react-redux";
import { addChemical, removeChemical } from "../features/chemicalSlice";
import { Button, Container, Table } from "reactstrap";
const ChemicalApp = () => {
  const chemicals = [
    { id: 1, name: "Hydrochloric acid", formula: "HCl" },
    { id: 2, name: "Sodium Chloride", formula: "NaCl" },
    { id: 3, name: "Sulfuric Acid", formula: "H2SO4" },
    { id: 4, name: "Ammonia", formula: "NH3" },
    { id: 5, name: "Ethanol", formula: "C2H5OH" },
  ];
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputFomula, setInputFomula] = useState("");
  // const [chemicalItem, setChemicalItem] = useState(chemicals);
  const dispatch = useDispatch();
  const newchemicals = useSelector((state) => state.chemicals.items);
  const handleAdd = () => {
    if (inputFomula && inputName) {
      dispatch(addChemical(inputName + " - " + inputFomula));
      setInputValue("");
    } else {
      alert("Please enter both Name and Formula");
    }
  };
  const handleRemove = (index) => {
    dispatch(removeChemical(index));
  };
  const handleEdit = (index) => {
    dispatch(removeChemical(index));
    dispatch(
      addChemical(
        newchemicals[index].name + " - " + newchemicals[index].formula
      )
    );
  };

  const handleSearch = () => {};
  return (
    <Container>
      <h2 className="title">chemical List</h2>
      <div className="input-section">
        <input
          type="text"
          className="input-text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Add a new chemical's Name"
        />
        <input
          type="text"
          className="input-text"
          value={inputFomula}
          onChange={(e) => setInputFomula(e.target.value)}
          placeholder="Add a new chemical's Formula"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="SearchBar">
        <input
          type="text"
          className="input-text"
          placeholder="Search Your Chemical"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Table hover className="chemicals-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Formula</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {chemicals.map((chemical, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{chemical.name}</td>
              <td>{chemical.formula}</td>
              <td>
                <Button onClick={() => handleRemove(index)}>Remove</Button>
                <Button onClick={() => handleEdit(index)}>Edit</Button>
              </td>
            </tr>
          ))}
          {newchemicals.map((chemical, index) => (
            <tr key={index}>
              <td>{index + 6}</td>
              <td>{chemical.split(" - ")[0]}</td>
              <td>{chemical.split(" - ")[1]}</td>
              <td>
                <Button onClick={() => handleRemove(index)}>Remove</Button>
                <Button onClick={() => handleEdit(index)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ChemicalApp;
