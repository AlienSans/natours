/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const bookTour = async tourId => {
  const stripe = Stripe(
    "pk_test_51McrmLHSTpNMd0pwIP4Ju0sLmb7cjQzd1RKlV7t8C2rqAKBZg7RIywQVBnCKTiNXzcrRb3f969vRKDL7SuiFdNXL00xLSnbZpG"
  );
  try {
    // 1) Get checkout session from API/End-point
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
