import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../redux/cardSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./AddCard.module.css";

const AddCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.cardList);

  const [formdata, setFormdata] = useState({
    cardHolder: user,
    cardNumber: "",
    validMonth: "",
    validYear: "",
    cvc: "",
    issuer: "",
  });

  const submit = (event) => {
    event.preventDefault();

    dispatch(addCard(formdata));

    setFormdata({
      cardHolder: "",
      cardNumber: "",
      validMonth: "",
      validYear: "",
      cvc: "",
      issuer: "",
    });

    navigate("/cards");
  };

  const change = (event) => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Header />
      <main>
        <h2>Lägg till ett nytt bankkort:</h2>
        <h3>(förhandsvisning)</h3>
        <Card
          issuer={formdata.issuer}
          validMonth={formdata.validMonth}
          validYear={formdata.validYear}
          cardNumber={formdata.cardNumber}
          cardHolder={user.toUpperCase()}
          showBtn={false}
        />

        <form onSubmit={submit}>
          <label className={styles.label} htmlFor="cardNumber">
            Kortnummer:
          </label>
          <input
            className={styles.inputfield}
            type="text"
            name="cardNumber"
            id="cardNumber"
            value={formdata.cardNumber}
            required
            pattern="[0-9]{16}"
            placeholder="0000 0000 0000 0000"
            maxLength="16"
            size="16"
            onChange={change}
          />
          <br />
          <label className={styles.label} htmlFor="cardHolder">
            Kortinnehavare:
          </label>
          <input
            className={styles.inputfield}
            type="text"
            name="cardHolder"
            id="cardHolder"
            value={user}
            placeholder={user}
            disabled
            onChange={change}
          />

          <br />
          <fieldset>
            <legend className={styles.label}>Giltighetstid:</legend>
            <span className={styles.validity}>
              <label className={styles.label} htmlFor="validMonth">
                MM
              </label>
              <input
                className={styles.inputfield}
                type="number"
                name="validMonth"
                id="validMonth"
                value={formdata.validMonth}
                placeholder="00"
                min="01"
                max="12"
                required
                onChange={change}
              />
            </span>
            <span className={styles.validity}>
              <label className={styles.label} htmlFor="validYear">
                ÅÅ
              </label>
              <input
                className={styles.inputfield}
                type="number"
                name="validYear"
                id="validYear"
                value={formdata.validYear}
                placeholder="22"
                min="22"
                max="27"
                required
                onChange={change}
              />
            </span>
            <span className={styles.validity}>
              <label className={styles.label} htmlFor="cvc">
                CVC
              </label>
              <input
                className={`${styles.inputfield} ${styles.cvc}`}
                type="text"
                name="cvc"
                id="cvc"
                value={formdata.cvc}
                pattern="[0-9]{3}"
                maxLength="3"
                placeholder="000"
                required
                onChange={change}
              />
            </span>
          </fieldset>

          <div className={styles.customSelect}>
            <label className={styles.label}>Kortutgivare:</label>
            <select
              name="issuer"
              id="issuer"
              value={formdata.issuer}
              required
              onChange={change}
            >
              <option value="" disabled>
                Välj kortutgivare:
              </option>
              <option name="Visa">Visa</option>
              <option name="MasterCard">MasterCard</option>
              <option name="American Express">American Express</option>
            </select>
          </div>
          <br />
          <button className={styles.addbutton}>Lägg till kort.</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AddCard;
