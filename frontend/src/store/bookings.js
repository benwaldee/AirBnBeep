import { csrfFetch } from './csrf';

//types

const GET__USER_BOOKINGS = 'bookings/userID';


//actions


const getBookingsBySpotAction = (userBookings) => {
    return {
        type: GET__USER_BOOKINGS,
        payload: userBookings
    }
}

//thunks



export const getUserBookingsThunk = () => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/current`);
    const userBookings = await response.json();


    console.log('thunk', userBookings)

    dispatch(getBookingsBySpotAction(userBookings));
    return response;
};


//reducer

const initialState = { userBookings: null };

const bookingsReducer = (state = initialState, action) => {

    let bookings;

    switch (action.type) {
        case GET__USER_BOOKINGS:
            bookings = { ...state, userBookings: { ...state.userBookings } }

            let book = {}



            for (let books of action.payload.Bookings) {
                book[books.id] = books
            }

            bookings.userBookings = book

            return bookings

        default:
            return state;
    }
};

export default bookingsReducer;
