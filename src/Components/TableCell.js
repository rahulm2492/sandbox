export default function TableCell({ onSelect, row, col, onSave, value }) {
  const val = value?.[row]?.[col] ?? "";
  const props = { ...(val ? { value: val } : {}) };
  return (
    <td className="TableCell" onMouseDown={() => onSelect(row, col)}>
      <input type="text" onChange={(e) => onSave(e, row, col)} value={val} />
    </td>
  );
}
