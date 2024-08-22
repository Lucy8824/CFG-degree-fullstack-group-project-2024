import React from "react";
import "./Profile.css";

const ProfileArray = ({ title, items = [], onItemsChange, isEditing }) => {
  const handleAddItem = () => {
    onItemsChange([...items, '']); // Add a new empty item
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  return (
    <div>
      <h3>{title}</h3>
      {isEditing ? (
        <>
          {items.map((item, index) => (
            <div key={index} >
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index] = e.target.value;
                  onItemsChange(newItems);
                }}
              />
              <button type="button" onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
        </>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileArray;