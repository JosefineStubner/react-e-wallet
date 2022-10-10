import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/cardSlice";
import { useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./AddCard.module.css";

const Cards = () => {
  const dispatch = useDispatch();
  const { cards, status, activeCard } = useSelector((state) => state.cardList);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Välkommen, {activeCard.cardHolder}!</h2>
        <h3>AKTIVT KORT</h3>
        <Card
          issuer={activeCard.issuer}
          validMonth={activeCard.validMonth}
          validYear={activeCard.validYear}
          cardNumber={activeCard.cardNumber}
          cvc={activeCard.cvc}
          cardHolder={activeCard.cardHolder}
          active={activeCard.active}
          showBtn={false}
        />

        {cards &&
          cards.map((card, i) => {
            const {
              cardHolder,
              issuer,
              cardNumber,
              validMonth,
              validYear,
              cvc,
            } = card;

            return (
              <Card
                key={i}
                issuer={issuer}
                validMonth={validMonth}
                validYear={validYear}
                cardNumber={cardNumber}
                cvc={cvc}
                cardHolder={cardHolder}
                showBtn={true}
              />
            );
          })}

        <Link to="/addcard">
          <button className={styles.addbutton}>Lägg till nytt kort!</button>
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default Cards;
