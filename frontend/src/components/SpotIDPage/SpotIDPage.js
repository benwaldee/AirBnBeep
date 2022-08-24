import './SpotIDPage.css'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllSpotsThunk, getSpotByIDThunk } from '../../store/spots'
import { getReviewsBySpotIDThunk } from '../../store/reviews'

const SpotIDPage = () => {

    const history = useHistory()

    let { spotID } = useParams()
    spotID = parseInt(spotID)

    const dispatch = useDispatch()

    const oneSpot = useSelector((state) => state.spots?.oneSpot)
    const revObj = useSelector((state => state.reviews?.oneSpotReviews))

    let revArr;

    if (revObj) {

        revArr = Object.values(revObj)
    }

    console.log('my review array', revArr)

    useEffect(() => {
        dispatch(getSpotByIDThunk(spotID))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {


                };
            })
        dispatch(getReviewsBySpotIDThunk(spotID))
    }, [])


    if (oneSpot && revObj) {
        return (
            <div className='spotIDOuterDiv'>
                <div className='spotIDInnerDiv'>
                    <div className='spotIDTitle'> {oneSpot?.name}</div>
                    <div className='subtitleDiv'>
                        <div>{oneSpot?.avgStarRating}</div>
                        <div>{oneSpot?.numReviews} reviews</div>
                        <div>{oneSpot?.city}</div>
                        <div>{oneSpot?.state}</div>
                        <div>{oneSpot?.country}</div>
                    </div>
                    <img className='spotIDImage' src={oneSpot?.Images[0].url} />
                    <div>Mobile listing hosted by {oneSpot?.Owner.firstName}</div>
                    <div>{oneSpot?.description}</div>
                    <div className='reviewDiv'>
                        <div>Reviews</div>
                        {revArr?.map((review) => {
                            return (
                                <div key='review.id'>
                                    <div> {review.User.firstName}</div>
                                    <div> {review.createdAt}</div>
                                    <div>{review.stars}</div>
                                    <div>{review.review}</div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default SpotIDPage
