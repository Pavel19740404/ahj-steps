import React, { useState, useEffect } from 'react';

function TrainingForm({ onAdd, initialDate = '', initialKm = '', submitLabel = 'OK' }) {
  const [date, setDate] = useState(initialDate);
  const [km, setKm] = useState(initialKm);

  useEffect(() => {
    setDate(initialDate);
    setKm(initialKm);
  }, [initialDate, initialKm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !km) return;
    const kmNum = parseFloat(km);
    if (isNaN(kmNum) || kmNum <= 0) return;
    onAdd(date, kmNum);
    setDate('');
    setKm('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Дата</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="form-group">
        <label>Пройдено км</label>
        <input
          type="number"
          value={km}
          onChange={(e) => setKm(e.target.value)}
          placeholder="0"
          min="0"
          step="0.1"
        />
      </div>
      <button type="submit" className="btn-ok">{submitLabel}</button>
    </form>
  );
}

export default TrainingForm;
