import { useState } from "react";

// material-ui components

type PropsType = {
  onChange?: any;
  logoUri?: string;
};
export default function Logo({ onChange, logoUri }: PropsType) {
  const [logo, setLogo] = useState<any>("");
  const logoChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
      onChange(e);
    }
  };

  return (
    <div className={"formControl"}>
      <h4 className="requireHead">
        <strong>Logo image</strong>
      </h4>
      <p>This image will also be used for navigation. 350 x 350 recommended.</p>
      <label className="logoImgInput" htmlFor="logoInput">
        <input
          type="file"
          id="logoInput"
          name="logoInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={logoChange}
        />
        {!logo && logoUri !== "" ? (
          <i className="fa fa-image" style={{ fontSize: "4.5em" }} />
        ) : (
          <i className="fa fa-image imgIcon" />
        )}
        {logo && logoUri === "" && (
          <div className="logoImg">
            <img
              src={URL.createObjectURL(logo)}
              width={160}
              height={160}
              alt=""
            />
          </div>
        )}
        {logoUri && !logo && (
          <div className="logoImg">
            <img src={logoUri} width={160} height={160} alt="" />
          </div>
        )}
      </label>
    </div>
  );
}
