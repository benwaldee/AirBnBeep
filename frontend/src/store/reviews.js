import { csrfFetch } from './csrf';

//types

const GET_REVIEWS_BY_SPOTID = 'reviews/spotID';
const ADD_REVIEW = 'reviews/add';
const EDIT_REVIEW = 'reviews/edit';
const DELETE_REVIEW = 'reviews/delete'


//actions



const getReviewsBySpotAction = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        payload: reviews
    }
}

const addReviewAction = (postedRev) => {
    return {
        type: ADD_REVIEW,
        payload: postedRev
    }
}

const editReviewAction = (editedRev) => {
    return {
        type: EDIT_REVIEW,
        payload: editedRev
    }
}

const deleteReviewAction = (revId) => {
    return {
        type: DELETE_REVIEW,
        payload: revId
    }
}

//thunks



export const getReviewsBySpotIDThunk = (spotID) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotID}/reviews`);
    const reviews = await response.json();
    dispatch(getReviewsBySpotAction(reviews));
    return response;
};


export const addReviewThunk = ({ userId, spotId, stars, review, }) => async (dispatch) => {

    const postOb = {
        userId,
        spotId,
        stars,
        review
    }

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postOb)
    });
    const postedRev = await response.json();
    dispatch(addReviewAction(postedRev));
    return response;
};

export const editReviewThunk = ({ userId, spotId, stars, review, revId }) => async (dispatch) => {

    const editOb = {
        userId,
        spotId,
        stars,
        review
    }

    const response = await csrfFetch(`/api/reviews/${revId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editOb)
    });
    const editedRev = await response.json();
    dispatch(editReviewAction(editedRev));
    return response;
};

export const deleteReviewThunk = (revId) => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/${revId}`, { method: 'DELETE', });
    const deletedRev = await response.json();
    dispatch(deleteReviewAction(revId));
    return response;
};




//reducer

const initialState = { oneSpotReviews: null };

const reviewsReducer = (state = initialState, action) => {

    let reviews;

    switch (action.type) {
        case GET_REVIEWS_BY_SPOTID:
            reviews = { ...state, oneSpotReviews: { ...state.oneSpotReviews } }

            let revObj = {}
            let revArr = action.payload.Reviews
            for (let review of revArr) {
                revObj[review.id] = review
            }

            reviews.oneSpotReviews = revObj
            return reviews

        case ADD_REVIEW:
            reviews = { ...state, oneSpotReviews: { ...state.oneSpotReviews } }
            reviews.oneSpotReviews[action.payload.id] = action.payload

            return reviews

        case EDIT_REVIEW:
            reviews = { ...state, oneSpotReviews: { ...state.oneSpotReviews } }
            reviews.oneSpotReviews[action.payload.id] = action.payload

            return reviews

        case DELETE_REVIEW:
            reviews = { ...state, oneSpotReviews: { ...state.oneSpotReviews } }
            delete reviews.oneSpotReviews[action.payload]
            return reviews

        default:
            return state;
    }
};

export default reviewsReducer;
