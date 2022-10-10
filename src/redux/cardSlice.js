import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/getUser", async () => {
  const result = await axios.get("https://randomuser.me/api/");
  const userName = result.data.results[0].name;
  return userName.first + " " + userName.last;
});

const cardSlice = createSlice({
  name: "cardList",
  initialState: {
    cards: [],
    user: null,
    activeCard: {
      cardHolder: "",
      cardNumber: "1111 2222 3333 4444",
      validMonth: "10",
      validYear: "22",
      cvc: "999",
      issuer: "Visa",
    },
    status: "idle",
  },
  reducers: {
    setActive: (state, { payload }) => {
      const thisCard = state.activeCard;
      state.activeCard = state.cards.find(
        (card) => card.cardNumber === payload
      );
      state.cards.push(thisCard);
      state.cards = state.cards.filter((card) => card.cardNumber !== payload);
    },
    addCard: (state, { payload }) => {
      if ([...state.cards, state.activeCard].length >= 4) {
        alert(
          "Du kan bara ha 4 kort i din plånbok. Vänligen ta bort ett kort innan du lägger till ett nytt!"
        );
        return;
      } else {
        state.cards = [...state.cards, payload];
        return;
      }
    },
    deleteCard: (state, { payload }) => {
      state.cards = state.cards.filter((card) => card.cardNumber !== payload);
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      if (!state.user) {
        state.user = action.payload;
        state.activeCard.cardHolder = action.payload;
        state.status = "Success!";
      }
    },
  },
});

export const { addCard, deleteCard, setActive } = cardSlice.actions;
export default cardSlice.reducer;
