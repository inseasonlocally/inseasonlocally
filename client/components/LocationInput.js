import React from 'react'

export default function LocationInput({
  type = "text",
  label,
  value,
  onChange,
  choices,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <label
        style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}
      >
        <span style={{ marginBottom: 5, fontWeight: "bold" }}>{label}</span>

        <select onChange={(e) => onChange(e.target.value)} value={value}>
          <option>Select State</option>
          {choices.map((choice) => (
            <option key={choice}>{choice}</option>
          ))}
        </select>

      </label>
    </div>
  );
}