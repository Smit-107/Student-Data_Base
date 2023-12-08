import React, { useState } from 'react';

const CourseModel = ({ onClose, onSave }) => {
  const [editedValue, setEditedValue] = useState('');

  const handleSave = () => {
    onSave(editedValue);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CourseModel;
