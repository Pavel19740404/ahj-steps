import React, { useState } from 'react';
import TrainingForm from './TrainingForm';
import TrainingTable from './TrainingTable';
import './App.css';

const INITIAL_DATA = [
  { id: 1, date: '2019-07-20', km: 5.7 },
  { id: 2, date: '2019-07-19', km: 14.2 },
  { id: 3, date: '2019-07-18', km: 3.4 },
];

function sortByDate(rows) {
  return [...rows].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function App() {
  const [rows, setRows] = useState(INITIAL_DATA);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editKm, setEditKm] = useState('');

  const handleAdd = (date, km) => {
    const existing = rows.find((r) => r.date === date);
    if (existing) {
      setRows((prev) =>
        sortByDate(prev.map((r) =>
          r.date === date ? { ...r, km: r.km + km } : r,
        )),
      );
    } else {
      setRows((prev) =>
        sortByDate([...prev, { id: Date.now(), date, km }]),
      );
    }
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (row) => {
    setEditId(row.id);
    setEditDate(row.date);
    setEditKm(String(row.km));
  };

  const handleEditSave = (date, km) => {
    setRows((prev) =>
      sortByDate(prev.map((r) =>
        r.id === editId ? { ...r, date, km } : r,
      )),
    );
    setEditId(null);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="app">
      <h1>Учёт тренировок</h1>

      {editId ? (
        <div>
          <TrainingForm
            onAdd={handleEditSave}
            initialDate={editDate}
            initialKm={editKm}
            submitLabel="Сохранить"
          />
          <button className="btn-cancel" onClick={handleEditCancel}>Отмена</button>
        </div>
      ) : (
        <TrainingForm onAdd={handleAdd} />
      )}

      <TrainingTable
        rows={rows}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
