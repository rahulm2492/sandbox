import { useContext, useEffect, useState } from "react";
import TableContext from "./TableContext";

export default function ContextMenu({ parentRef }) {
  const [visible, setVisibility] = useState(false);
  const cbFunctions = useContext(TableContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (!parentRef.current) {
      return null;
    }
    const parent = parentRef.current;
    const showMenu = (event) => {
      event.preventDefault();
      setVisibility(true);
      setX(event.clientX);
      setY(event.clientY);
    };

    const closeMenu = (event) => {
      setVisibility(false);
    };
    window.addEventListener("click", closeMenu);
    parent.addEventListener("contextmenu", showMenu);
  }, [parentRef]);

  const addColumn = (pos) => cbFunctions.callBackCols(pos);
  const addRow = (pos) => cbFunctions.callBackRows(pos);
  const style = {
    top: y,
    left: x
  };
  return (
    <div className="Context_Menu" style={style}>
      {visible && (
        <ul>
          <li onClick={() => addColumn(-1)}>Insert Column Before</li>
          <li onClick={() => addColumn(1)}>Insert Column After</li>
          <li onClick={() => addRow(1)}>Insert Row After</li>
          <li onClick={() => addRow(-1)}>Insert Row Before</li>
        </ul>
      )}
    </div>
  );
}
