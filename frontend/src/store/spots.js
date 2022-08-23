import { csrfFetch } from './csrf';

//types

const GET_ALL_SPOTS = 'spots/getall';
const GET_USER_SPOTS = 'spots/getuserspots'


//actions

const getAllSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    };
};

const getUserSpotsAction = (spots) => {
    return {
        type: GET_USER_SPOTS,
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

export const getUserSpotsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots/current');
    const spots = await response.json();
    dispatch(getUserSpotsAction(spots));
    return response;
};



//reducer

const initialState = { allSpots: null, allUserSpots: null };

const spotsReducer = (state = initialState, action) => {

    let spots;

    switch (action.type) {
        case GET_ALL_SPOTS:
            spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }
            let allSpots = {}
            for (let spot of action.payload.Spots) {
                allSpots[spot.id] = spot
            }
            spots.allSpots = allSpots
            return spots
        case GET_USER_SPOTS:

            spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }
            let allUserSpots = {}
            for (let spot of action.payload.Spots) {
                allUserSpots[spot.id] = spot
            }
            spots.allUserSpots = allUserSpots

            return spots
        default:
            return state;
    }
};

export default spotsReducer;
