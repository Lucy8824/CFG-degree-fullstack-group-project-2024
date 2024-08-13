import React, { useState } from "react";

const ProfileArray = ({ items, title, onItemsChange, isEditing }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [newItem, setNewItem] = useState("");

  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    onItemsChange(updatedItems);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      onItemsChange([...items, newItem]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onItemsChange(updatedItems);
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {isEditing && editIndex === index ? (
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                onBlur={() => setEditIndex(null)}
                autoFocus
              />
            ) : (
              <span onClick={() => isEditing && setEditIndex(index)}>{item}</span>
            )}
            {isEditing && (
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            )}
          </li>
        ))}
      </ul>
      {isEditing && (
        <>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add new ${title.toLowerCase()}`}
          />
          <button onClick={handleAddItem}>Add</button>
        </>
      )}
    </div>
  );
};

export default ProfileArray;



// const ProfileArray = ({ items, title }) => {
//     return (
//         <div>
//             <h2>{title}</h2>
//             <ul>
//                 {items.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
