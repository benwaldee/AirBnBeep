import { csrfFetch } from './csrf';

//types

const GET_USER_BOOKINGS = 'bookings/userID';
const UPDATE_BOOKING = 'bookings/update'
const DELETE_BOOKING = 'bookings/delete'
const ADD_BOOKING = 'bookings/add'

//actions


const getBookingsBySpotAction = (userBookings) => {
    return {
        type: GET_USER_BOOKINGS,
        payload: userBookings
    }
}

const updateUserBooking = (newBooking) => {
    return {
        type: UPDATE_BOOKING,
        payload: newBooking
    }
}

const deleteUserBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        payload: id
    }
}

const addUserBooking = (newBooking) => {
    return {
        type: ADD_BOOKING,
        payload: newBooking
    }
}

//thunks



export const getUserBookingsThunk = () => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/current`);
    const userBookings = await response.json();




    dispatch(getBookingsBySpotAction(userBookings));
    return response;
};

export const updateUserBookingThunk = (id, updateObj) => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateObj)
    });
    const newBooking = await response.json();

    dispatch(updateUserBooking(newBooking));
    return response;
};


export const addUserBookingThunk = (spotID, addObj) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotID}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addObj)
    });
    const newBooking = await response.json();

    dispatch(addUserBooking(newBooking));
    return response;
};

export const deleteUserBookingThunk = (id) => async (dispatch) => {

    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE',
    });
    const deleted = await response.json();
    dispatch(deleteUserBooking(id));
    return response;
};

//reducer

const initialState = { userBookings: {} };

const bookingsReducer = (state = initialState, action) => {

    let bookings;

    switch (action.type) {
        case GET_USER_BOOKINGS:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            let book = {}
            for (let books of action.payload.Bookings) {
                book[books.id] = books
            }
            bookings.userBookings = book
            return bookings

        case UPDATE_BOOKING:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            bookings.userBookings[action.payload.id] = action.payload
            return bookings
        case DELETE_BOOKING:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            delete bookings.userBookings[action.payload]
            return bookings
        case ADD_BOOKING:
            bookings = { ...state, userBookings: { ...state.userBookings } }
            bookings.userBookings[action.payload.id] = action.payload
            return bookings
        default:
            return state;
    }
};

export default bookingsReducer;
