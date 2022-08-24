import './SpotIDPage.css'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllSpotsThunk, getSpotByIDThunk } from '../../store/spots'
import { getReviewsBySpotIDThunk, addReviewThunk } from '../../store/reviews'


const SpotIDPage = () => {
    const [stars, setStars] = useState(5)
    const [reviewMessage, setReviewMessage] = useState('')
    const [showAddReview, setShowAddReview] = useState(false)
    const [errors, setErrors] = useState([]);

    const history = useHistory()

    let { spotID } = useParams()
    spotID = parseInt(spotID)


    const dispatch = useDispatch()

    const oneSpot = useSelector((state) => state.spots?.oneSpot)
    const revObj = useSelector((state => state.reviews?.oneSpotReviews))
    const sessionUser = useSelector((state) => state.session.user)
    const allSpots = useSelector((state) => state.spots.allSpots)




    let revArr;

    if (revObj) {

        revArr = Object.values(revObj)
    }

    useEffect(() => {
        dispatch(getSpotByIDThunk(spotID))
            .catch(async (res) => {
                if (!res.ok) {
                    history.push('/404')
                }
            }
            )
        dispatch(getReviewsBySpotIDThunk(spotID))
            .catch(async (res) => {
                if (!res.ok) {
                    history.push('/404')
                }
            }
            )

    }, [])

    const handleSubmit = (e) => {

        e.preventDefault()

        const addRev = {
            userId: sessionUser.id,
            spotId: spotID,
            stars,
            review: reviewMessage

        }
        dispatch(addReviewThunk(addRev))

        setReviewMessage('')
        setStars(0)
        setShowAddReview(false)

    }

    const addReview = () => {

        for (let rev of revArr) {
            if (rev.userId === sessionUser.id) {
                alert('You cannot review a spot more than once')
                return
            }
        }
        setShowAddReview(!showAddReview)

    }


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
                    <img className='spotIDImage' src={oneSpot?.Images[oneSpot.Images.length - 1].url} />
                    <div>Mobile listing hosted by {oneSpot?.Owner.firstName}</div>
                    <div>{oneSpot?.description}</div>
                    <div className='reviewDiv'>
                        <div>Reviews</div>
                        <div className='addReview' onClick={addReview}> Add a Review!</div>
                        {showAddReview && <div className='addReviewForm'>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    placeholder='review'
                                    maxLength='250'
                                    required
                                    value={reviewMessage}
                                    onChange={(e) => setReviewMessage(e.target.value)}
                                />
                                <input
                                    type='number'
                                    placeholder='stars'
                                    min={1}
                                    max={5}
                                    required
                                    value={stars}
                                    onChange={(e) => setStars(e.target.value)}
                                />
                                <button >Submit</button>
                            </form>

                        </div>}

                        {revArr?.map((review) => {
                            return (
                                <div key={review.id}>
                                    <div> {review.User?.firstName}</div>
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
