import { useState } from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button/Button";
import "./modalSytle.scss";

type PropsType = {
  target?: string;
  isShow?: any;
  handleClose?: any;
};
export default function PropertyModal({
  target,
  isShow,
  handleClose,
}: PropsType) {
  // const classes = useStyles();
  const defaultData =
    target === "property"
      ? { type: "", name: "" }
      : target === "level"
      ? { name: "", total: 5, value: 3 }
      : { name: "", total: 5, value: 3 };
  const [proItems, setProItems] = useState([defaultData]);

  const removeData = (key: any) => {
    const data = proItems;
    data.splice(key, 1);
    setProItems([...data]);
  };

  const addItem = () => {
    const data = proItems;
    data.push(defaultData);
    setProItems([...data]);
  };

  const handleChangeInput = (e: any, key: any) => {
    const temp: any = proItems;
    temp[key][e.target.name] = e.target.value;
    setProItems([...temp]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleClose(proItems);
  };

  return (
    <Dialog
      classes={{
        root: "center",
        paper: "modal",
      }}
      open={isShow}
      // TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        handleClose(null);
      }}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className="modalHeader"
        style={{ borderBottom: "1px solid #e5e8eb" }}
      >
        <IconButton
          className="closeModal"
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => {
            handleClose(null);
          }}
        >
          <Close width="30px" height="30px" />
        </IconButton>
        <h3
          className="modalTitle"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >
          Add{" "}
          {target === "property"
            ? "Properties"
            : target === "level"
            ? "Levels"
            : "Stats"}
        </h3>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className="modalBody propertyModal"
        style={{ borderBottom: "1px solid #e5e8eb" }}
      >
        {target === "property" && (
          <p>
            Properties show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </p>
        )}
        {target === "level" && (
          <p>
            Levels show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </p>
        )}
        {target === "stats" && (
          <p>
            Stats show up underneath your item, are clickable, and can be
            filtered in your collection's sidebar.
          </p>
        )}
        <div className="properties-list">
          <div className="properties-row">
            <div className="properties-close border-none" />
            <div className="properties-type header">
              {target === "property" ? "Type" : "Name"}
            </div>
            <div className="properties-name header">
              {target === "property" ? "Name" : "Value"}
            </div>
          </div>
          {proItems.map((item, key) => (
            <div key={key}>
              <div className="properties-row">
                <div className="properties-close">
                  <Close
                    className="text-gray"
                    onClick={() => {
                      removeData(key);
                    }}
                  />
                </div>
                <div className="properties-type">
                  <input
                    className="bordered-input"
                    placeholder={target === "property" ? "Character" : "Speed"}
                    name={target === "property" ? "type" : "name"}
                    onChange={(e) => {
                      handleChangeInput(e, key);
                    }}
                  />
                </div>
                <div className="properties-name">
                  {target === "property" ? (
                    <input
                      className="bordered-input"
                      placeholder="Male"
                      name="name"
                      onChange={(e) => {
                        handleChangeInput(e, key);
                      }}
                    />
                  ) : (
                    <div className="progress-box">
                      <input
                        className="bordered-input first"
                        type="number"
                        name="value"
                        onChange={(e) => {
                          handleChangeInput(e, key);
                        }}
                        value={item.value}
                      />
                      <div className="properties-close br-0">Of</div>
                      <input
                        className="bordered-input last"
                        type="number"
                        name="total"
                        onChange={(e) => {
                          handleChangeInput(e, key);
                        }}
                        value={item.total}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addItem} className="add-btn">
            <p>Add more</p>
          </Button>
        </div>
      </DialogContent>
      <DialogActions className="displayCenter">
        <Button className="save-btn" onClick={handleSubmit}>
          <p>Save</p>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
