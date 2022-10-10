import styles from "./Card.module.css";
import { useDispatch } from "react-redux";
import { deleteCard, setActive } from "../redux/cardSlice";

const Card = ({
  cardNumber,
  validMonth,
  validYear,
  issuer,
  cardHolder,
  showBtn,
}) => {
  const dispatch = useDispatch();

  const activate = (cardnumber) => {
    dispatch(setActive(cardnumber));
  };

  const remove = (cardnumber) => {
    dispatch(deleteCard(cardnumber));
  };

  return (
    <div className={styles.cardWrap}>
      <div
        onClick={showBtn ? () => activate(cardNumber) : undefined}
        className={`${styles.card} ${issuer.replace(/\s/g, "")}`}
      >
        <p className={styles.issuer}>{issuer}</p>
        <span className={styles.chipAndNumber}>
          <p className={styles.number}>{cardNumber}</p>
        </span>
        <span>
          <div>
            <p className={styles.heading}>Kortinnehavare</p>
            <p className={styles.name}>{cardHolder}</p>
          </div>
          <div className={styles.validitycontainer}>
            <p className={styles.heading}>Giltigt:</p>
            <p className={styles.name}>
              {validMonth}/{validYear}
            </p>
          </div>
        </span>
      </div>
      {showBtn && (
        <button
          className={styles.removeButton}
          onClick={() => remove(cardNumber)}
          type="button"
        >
          <span aria-hidden="true">Ta Bort</span>
        </button>
      )}
    </div>
  );
};

export default Card;
