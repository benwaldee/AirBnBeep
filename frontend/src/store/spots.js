import { csrfFetch } from './csrf';

//types

const GET_ALL_SPOTS = 'spots/getall';


//actions

const getAllSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    };
};

//thunks

export const getAllSpotsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots');
    const spots = await response.json();
    dispatch(getAllSpotsAction(spots));
    return response;
};


//reducer

const initialState = { spots: null };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return action.payload
        default:
            return state;
    }
};

export default spotsReducer;
