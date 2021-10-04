import "./styles.css";
import React from "react";
import Table from "./Components/Table";
import { TableProvider } from "./Components/TableContext";
export default function App() {
  const [data, setData] = React.useState([[]]);
  const [rows, setRows] = React.useState(2);
  const [cols, setCols] = React.useState(2);
  const [pos, setPosition] = React.useState({ col: 0, row: 0 });

  const callBackRows = React.useCallback(
    (beforeOrAfter) => {
      console.log(beforeOrAfter);
      console.log(pos);
      const newData = [...data.slice(0, 1), [], ...data.slice(1)];
      console.log(newData);
      setData(newData);
      setRows((rows) => rows + 1);
    },
    [pos]
  );

  const callBackCellData = React.useCallback((e, row, col) => {
    const selectedRow = data?.[row] || [];
    selectedRow[col] = e?.target?.value;
    data[row] = selectedRow;
    setData([...data]);
  }, []);

  const callBackCols = React.useCallback(
    (beforeOrAfter) => {
      console.log(beforeOrAfter);
      console.log(pos);

      setCols((cols) => cols + 1);
    },
    [pos]
  );

  const callBackPos = React.useCallback((pos) => {
    setPosition({ ...pos });
  }, []);
  return (
    <div className="App">
      <TableProvider
        value={{ callBackCols, callBackRows, callBackPos, callBackCellData }}
      >
        <Table rows={rows} cols={cols} data={data} />
      </TableProvider>
    </div>
  );
}
