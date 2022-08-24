import { csrfFetch } from './csrf';

//types

const GET_REVIEWS_BY_SPOTID = 'reviews/spotID';


//actions



const getReviewsBySpotAction = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOTID,
        payload: reviews
    }
}

//thunks



export const getReviewsBySpotIDThunk = (spotID) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotID}/reviews`);
    const reviews = await response.json();
    dispatch(getReviewsBySpotAction(reviews));
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

        default:
            return state;
    }
};

export default reviewsReducer;
