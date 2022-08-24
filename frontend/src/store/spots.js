import { csrfFetch } from './csrf';

//types

const GET_ALL_SPOTS = 'spots/getall';
const GET_USER_SPOTS = 'spots/getuserspots'
const ADD_SPOT = 'spots/add'
const DELETE_SPOT = 'spots/delete'
const UPDATE_SPOT = 'spots/update'
// const GET_ONE_SPOT = 'spots/getonespot'
const ADD_IMAGE_TO_SPOT = 'spots/addimage'

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

const addSpotAction = (newSpot) => {
    return {
        type: ADD_SPOT,
        payload: newSpot
    }
}

const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_SPOT,
        payload: spotId
    }
}

const editSpotAction = (editSpot) => {

    console.log('editSPot in act', editSpot)
    return {
        type: UPDATE_SPOT,
        payload: editSpot
    }
}

const addImageToSpotAction = ({ url, spotID }) => {


    return {
        type: ADD_IMAGE_TO_SPOT,
        payload: { url, spotID }
    }
}

// const getOneSpotAction = (oneSpot) => {
//     return {
//         type: GET_ONE_SPOT,
//         payload: oneSpot
//     }
// }

//thunks

export const getAllSpotsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots');
    const spots = await response.json();

    console.log(spots)

    dispatch(getAllSpotsAction(spots));
    return response;
};

export const getUserSpotsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/spots/current');
    const spots = await response.json();

    // console.log('spots thunk fetch return', spots)

    dispatch(getUserSpotsAction(spots));
    return response;
};

export const addSpotThunk = ({ name, price, description, city, country, state, address, lat, lng }) => async (dispatch) => {

    const postOb = { name, price, description, city, country, state, address, lat, lng }


    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postOb)
    });
    const newSpot = await response.json();
    dispatch(addSpotAction(newSpot));
    return newSpot;


};

export const deleteSpotThunk = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    const deleted = await response.json();
    dispatch(deleteSpotAction(spotId));
    return response;
};

export const editSpotThunk = ({ name, price, description, city, country, state, address, lat, lng, spotID }) => async (dispatch) => {

    const editOb = { name, price, description, city, country, state, address, lat, lng }


    const response = await csrfFetch(`/api/spots/${spotID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editOb)
    });
    const editSpot = await response.json();

    // console.log('editSPot in thunk ebfore act', editSpot)
    dispatch(editSpotAction(editSpot));
    return editSpot;
};

// export const getSpotByIDThunk = (spotID) => async (dispatch) => {

//     const response = await csrfFetch(`/api/spots/${spotID}`);
//     const oneSpot = await response.json();
//     dispatch(getOneSpotAction(oneSpot));
//     return response;
// };

export const addImageToSpotThunk = ({ url, previewImage, spotID }) => async (dispatch) => {

    const addImgtoSpotOb = { url, previewImage }


    const response = await csrfFetch(`/api/spots/${spotID}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addImgtoSpotOb)
    });
    const image = await response.json();

    // console.log('editSPot in thunk ebfore act', editSpot)
    dispatch(addImageToSpotAction({ url: image.url, spotID: spotID }));
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

        case ADD_SPOT:
            spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }
            spots.allSpots[action.payload.id] = action.payload
            spots.allUserSpots[action.payload.id] = action.payload
            return spots

        case DELETE_SPOT:
            spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }

            delete spots.allSpots[action.payload]
            delete spots.allUserSpots[action.payload]

            return spots

        case UPDATE_SPOT:
            spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }

            // console.log('editSPot in reducer', action)

            spots.allSpots[action.payload.id] = action.payload
            spots.allUserSpots[action.payload.id] = action.payload

            return spots

        // case GET_ONE_SPOT:
        //     spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }
        //     spots.oneSpot = action.payload

        //     return spots

        case ADD_IMAGE_TO_SPOT:
            //dont want image slcie of state so just update state
            spots = { ...state, allSpots: { ...state.allSpots }, allUserSpots: { ...state.allUserSpots } }
            spots.allUserSpots[action.payload.spotID].previewImage = action.payload.url
            return spots

        default:
            return state;
    }
};

export default spotsReducer;
