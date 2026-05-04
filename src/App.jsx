import React, { useState } from 'react';
import './App.css';

// Парсим дату ДД.ММ.ГГ в объект Date для сортировки
function parseDate(str) {
  const [d, m, y] = str.split('.');
  return new Date(`20${y}-${m}-${d}`);
}

const INITIAL_DATA = [
  { id: 1, date: '20.07.2019', km: 5.7 },
  { id: 2, date: '19.07.2019', km: 14.2 },
  { id: 3, date: '18.07.2019', km: 3.4 },
];

export default function App() {
  const [rows, setRows] = useState(INITIAL_DATA);
  const [date, setDate] = useState('');
  const [km, setKm] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !km) return;

    const kmNum = parseFloat(km);
    if (isNaN(kmNum)) return;

    if (editId !== null) {
      // Режим редактирования
      setRows((prev) =>
        prev.map((row) =>
          row.id === editId ? { ...row, date, km: kmNum } : row,
        ).sort((a, b) => parseDate(b.date) - parseDate(a.date)),
      );
      setEditId(null);
    } else {
      // Проверяем есть ли уже такая дата
      const existing = rows.find((r) => r.date === date);
      if (existing) {
        setRows((prev) =>
          prev
            .map((row) =>
              row.date === date ? { ...row, km: row.km + kmNum } : row,
            )
            .sort((a, b) => parseDate(b.date) - parseDate(a.date)),
        );
      } else {
        const newRow = { id: Date.now(), date, km: kmNum };
        setRows((prev) =>
          [...prev, newRow].sort(
            (a, b) => parseDate(b.date) - parseDate(a.date),
          ),
        );
      }
    }

    setDate('');
    setKm('');
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (row) => {
    setDate(row.date);
    setKm(String(row.km));
    setEditId(row.id);
  };

  const handleCancel = () => {
    setDate('');
    setKm('');
    setEditId(null);
  };

  return (
    <div className="app">
      <h1>Учёт тренировок</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Дата (ДД.ММ.ГГ)</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="20.07.19"
            maxLength={8}
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
        <button type="submit" className="btn-ok">
          {editId !== null ? 'Сохранить' : 'OK'}
        </button>
        {editId !== null && (
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Отмена
          </button>
        )}
      </form>

      {rows.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Дата (ДД.ММ.ГГ)</th>
              <th>Пройдено км</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.km}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(row)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(row.id)}
                    title="Удалить"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
