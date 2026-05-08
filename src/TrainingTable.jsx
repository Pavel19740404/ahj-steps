import React from 'react';

function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-');
  return `${d}.${m}.${y}`;
}

function TrainingTable({ rows, onDelete, onEdit }) {
  if (rows.length === 0) return null;

  return (
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
            <td>{formatDate(row.date)}</td>
            <td>{row.km}</td>
            <td className="actions">
              <button
                className="btn-edit"
                onClick={() => onEdit(row)}
                title="Редактировать"
              >
                ✏️
              </button>
              <button
                className="btn-delete"
                onClick={() => onDelete(row.id)}
                title="Удалить"
              >
                ✕
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TrainingTable;
