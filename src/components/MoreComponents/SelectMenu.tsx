import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SelectMenu = ({ initialState, data }: any) => {
  const [first, setfirst] = useState<any>(initialState);

  const handleSelect = (e: any) => {
    setfirst(e.target.value);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          value={first}
          onChange={handleSelect}
          name="first"
          id="dropdown-button-dark-example1"
          variant="secondary"
        >
          {first || initialState}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          {data.map((item: any, index: any) => (
            <Dropdown.Item
              key={index}
              onClick={() => setfirst(item)}
              href="#/ac tion-1"
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SelectMenu;
