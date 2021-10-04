import TableCell from "./TableCell";
import TableRow from "./TableRow";
import ContextMenu from "./ContextMenu";
import { useRef, useContext } from "react";
import TableContext from "./TableContext";

export default function Table({ rows, cols, data }) {
  const tableRef = useRef(null);
  const cbFunctions = useContext(TableContext);

  const onSelect = (row, col) => {
    cbFunctions.callBackPos({ row, col });
  };

  const onSave = (e, row, col) => {
    cbFunctions.callBackCellData(e, row, col);
  };

  const generateHeaders = (cols) => {
    return [...new Array(cols)].map((_, index) => (
      <th key={index}>{index + 1}</th>
    ));
  };
  return (
    <>
      <table ref={tableRef}>
        <thead>
          <tr>{generateHeaders(cols)}</tr>
        </thead>
        <tbody>
          {[...new Array(rows)].map((row, indexR) => (
            <TableRow key={`row_${indexR}`}>
              {[...new Array(cols)].map((col, indexC) => (
                <TableCell
                  key={`col_${indexR}_${indexC}`}
                  col={indexC}
                  row={indexR}
                  onSelect={onSelect}
                  onSave={onSave}
                  value={data}
                ></TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
      <ContextMenu parentRef={tableRef} />
    </>
  );
}
