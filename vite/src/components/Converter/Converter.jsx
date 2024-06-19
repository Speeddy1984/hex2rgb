import { useState } from "react";
import styles from "./converter.module.css";

const Converter = () => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setHex(value);

    if (value.startsWith("#") && value.length === 7) {
      setError("");

      if (/^#[0-9A-F]{6}$/i.test(value)) {
        const r = parseInt(value.slice(1, 3), 16);
        const g = parseInt(value.slice(3, 5), 16);
        const b = parseInt(value.slice(5, 7), 16);
        const rgbString = `rgb(${r}, ${g}, ${b})`;

        setRgb(rgbString);
        document.body.style.backgroundColor = rgbString;
      } else {
        setError("Ошибка! Неверный HEX-код");
        setRgb("");
        document.body.style.backgroundColor = "rgb(255, 0, 0)";
      }
    } else if (value.length === 7) {
      setError("Неверный формат HEX-кода");
      setRgb("");
      document.body.style.backgroundColor = `rgb(255, 0, 0)`;
    } else {
      setError("");
      setRgb("");
      document.body.style.backgroundColor = "";
    }
  };

  return (
    <div>
      <input
        className={styles["input"]}
        type="text"
        value={hex}
        onChange={handleChange}
        placeholder="#000000"
        maxLength="7"
      />
      <div className={styles["output"]}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {rgb && <p>{rgb}</p>}
      </div>
    </div>
  );
};

export default Converter;
