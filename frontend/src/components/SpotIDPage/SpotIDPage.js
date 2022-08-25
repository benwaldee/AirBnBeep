import './SpotIDPage.css'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllSpotsThunk, getSpotByIDThunk } from '../../store/spots'
import { getReviewsBySpotIDThunk, addReviewThunk, editReviewThunk, deleteReviewThunk } from '../../store/reviews'
import { Modal, useModalContext } from '../../context/Modal';
import star from './star.PNG'


const SpotIDPage = () => {
    const [stars, setStars] = useState(0)
    const [reviewMessage, setReviewMessage] = useState('')
    const [starsEdit, setStarsEdit] = useState(5)

    const [reviewMessageEdit, setReviewMessageEdit] = useState('')
    const [showAddReview, setShowAddReview] = useState(false)

    const [errors, setErrors] = useState([]);
    const [showEdit, setShowEdit] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [charCount, setCharCount] = useState(0)


    const { showLoginFormSpotCard, setShowLoginFormSpotCard } = useModalContext();



    const history = useHistory()

    let { spotID } = useParams()
    spotID = parseInt(spotID)


    const dispatch = useDispatch()


    const sessionUser = useSelector((state) => state.session.user)
    const allSpots = useSelector((state) => state.spots.allSpots)

    useEffect(() => {
        if (!sessionUser) {
            history.push('/')
        }
        setShowLoginFormSpotCard(false)
    }, [])






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

    }, [showAddReview, showEdit, toggle])




    const oneSpot = useSelector((state) => state.spots?.oneSpot)
    const revObj = useSelector((state => {
        if (oneSpot) { return state.reviews?.oneSpotReviews }
        else return
    }
    ))
    let revArr;

    if (revObj) {

        revArr = Object.values(revObj)
    }


    const handleSubmit = (e) => {

        e.preventDefault()

        if (reviewMessage.length < 50) {
            alert('Review must be more than 50 characters')
            return
        }

        if (stars < 1) {
            alert('Please provide rating')
            return
        }

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
        setCharCount(0)
        setStars(0)


        dispatch(getSpotByIDThunk(spotID))
        dispatch(getReviewsBySpotIDThunk(spotID))
    }

    const handleEditSubmit = (e, revId) => {

        e.preventDefault()

        if (stars < 1) {
            alert('Please provide rating')
            return
        }
        if (reviewMessageEdit.length < 50) {
            alert('Review must be more than 50 characters')
            return
        }

        const editRev = {
            userId: sessionUser.id,
            spotId: spotID,
            stars: stars,
            review: reviewMessageEdit,
            revId
        }
        dispatch(editReviewThunk(editRev))

        setReviewMessageEdit(reviewMessageEdit)
        setStarsEdit(starsEdit)
        setShowEdit(false)
        setStars(0)


        dispatch(getSpotByIDThunk(spotID))
        dispatch(getReviewsBySpotIDThunk(spotID))
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

    const showEditFunc = (review) => {

        // console.log(review)

        setShowEdit(!showEdit)
        setStarsEdit(review.stars)
        setReviewMessageEdit(review.review)


    }

    const deleteReviewFunc = (revId) => {

        console.log('delete click')
        setShowEdit(false)

        dispatch(deleteReviewThunk(revId))

        setToggle(!toggle)

        dispatch(getSpotByIDThunk(spotID))
        dispatch(getReviewsBySpotIDThunk(spotID))
    }

    const starCount = (num) => {

        setStars(num)

    }


    if (oneSpot && revArr && sessionUser) {
        return (
            <div className='spotIDOuterDiv'>
                <div className='spotIDInnerDiv'>
                    <div className='spotIDTitle'> {oneSpot?.name}</div>
                    <div className='subtitleDiv'>
                        <img className='spotIDPageStar' src={star}></img>
                        <div className='siRating'>{oneSpot?.avgStarRating}</div>
                        <div className='dot'>·</div>
                        <div className='siNum' >{oneSpot?.numReviews} reviews</div>
                        <div className='period'>.</div>
                        <div className='siLoc'>{oneSpot?.city}, {oneSpot?.state}, {oneSpot?.country} </div>

                    </div>
                    <img className='spotIDImage' src={oneSpot?.Images[oneSpot.Images.length - 1].url} />
                    <div className='siHost'>Mobile listing hosted by {oneSpot?.Owner.firstName}</div>
                    <div className='cleanLine'></div>
                    <p>{oneSpot?.description}</p>
                    <div className='cleanLine'></div>
                    <div className='reviewDiv'>
                        <div className='reviewsTitle'>Reviews</div>
                        <div className='addReview' onClick={addReview}> Add a review</div>
                        {showAddReview && <div className='addReviewForm'>

                            <form className='formAddReview' onSubmit={handleSubmit}>
                                <textarea
                                    id='addReviewMessage'
                                    placeholder='Write review here!'
                                    maxLength='250'

                                    required
                                    value={reviewMessage}
                                    onChange={(e) => {
                                        setReviewMessage(e.target.value)
                                        setCharCount(e.target.value.length)
                                    }}
                                />
                                <div className='charCountReview'>{charCount}/500</div>


                                <div className='starDiv'>
                                    {stars < 1 && <i id='noStar1' onClick={() => starCount(1)} class="fa-regular fa-star"></i>}
                                    {stars > 0 && <i id='star1' onClick={() => starCount(1)} class="fa-solid fa-star"></i>}
                                    {stars < 2 && <i id='noStar2' onClick={() => starCount(2)} class="fa-regular fa-star"></i>}
                                    {stars > 1 && <i id='star2' onClick={() => starCount(1)} class="fa-solid fa-star"></i>}
                                    {stars < 3 && <i id='noStar3' onClick={() => starCount(3)} class="fa-regular fa-star"></i>}
                                    {stars > 2 && <i id='star3' onClick={() => starCount(2)} class="fa-solid fa-star"></i>}
                                    {stars < 4 && <i id='noStar4' onClick={() => starCount(4)} class="fa-regular fa-star"></i>}
                                    {stars > 3 && <i id='star4' onClick={() => starCount(3)} class="fa-solid fa-star"></i>}
                                    {stars < 5 && <i id='noStar5' onClick={() => starCount(5)} class="fa-regular fa-star"></i>}
                                    {stars > 4 && <i id='star5' onClick={() => starCount(4)} class="fa-solid fa-star"></i>}

                                </div>




                                <button className='addRevSubmit'>Leave review</button>
                            </form>

                        </div>}



                        {revArr?.map((review) => {
                            return (
                                <div className='reviewCardOuter' key={review.id}>
                                    <div className='nameDivRev'>
                                        <i class="fa-solid fa-circle-user"></i>
                                        {sessionUser.id === review.userId && <div className='revName'> {sessionUser.firstName}</div>}
                                        {sessionUser.id !== review.userId && <div className='revName'> {review.User?.firstName}</div>}
                                    </div>
                                    <div className='revDate'> {review.createdAt.slice(0, 10)}</div>
                                    <div className='revCardStarsDiv'>
                                        <i id='cardStar' class="fa-solid fa-star"></i>
                                        <div className='revStars'>{review.stars}</div>
                                    </div>
                                    <div>{review.review}</div>
                                    {sessionUser.id === review.userId &&
                                        <div>
                                            <button className='revEditButton' onClick={() => showEditFunc(review)}>Edit</button>
                                            <button className='revDeleteButton' onClick={() => deleteReviewFunc(review.id)}>Delete</button>
                                        </div>
                                    }
                                    {sessionUser.id === review.userId && showEdit && <div className='addReviewForm'>

                                        <form className='formAddReview' onSubmit={(e) => handleEditSubmit(e, review.id)}>
                                            <textarea
                                                id='addReviewMessage'
                                                placeholder='Edit review'
                                                maxLength='250'

                                                required
                                                value={reviewMessageEdit}
                                                onChange={(e) => {
                                                    setReviewMessageEdit(e.target.value)
                                                    setCharCount(e.target.value.length)
                                                }}
                                            />
                                            <div className='charCountReview'>{charCount}/500</div>


                                            <div className='starDiv'>
                                                {stars < 1 && <i id='noStar1' onClick={() => starCount(1)} class="fa-regular fa-star"></i>}
                                                {stars > 0 && <i id='star1' onClick={() => starCount(1)} class="fa-solid fa-star"></i>}
                                                {stars < 2 && <i id='noStar2' onClick={() => starCount(2)} class="fa-regular fa-star"></i>}
                                                {stars > 1 && <i id='star2' onClick={() => starCount(1)} class="fa-solid fa-star"></i>}
                                                {stars < 3 && <i id='noStar3' onClick={() => starCount(3)} class="fa-regular fa-star"></i>}
                                                {stars > 2 && <i id='star3' onClick={() => starCount(2)} class="fa-solid fa-star"></i>}
                                                {stars < 4 && <i id='noStar4' onClick={() => starCount(4)} class="fa-regular fa-star"></i>}
                                                {stars > 3 && <i id='star4' onClick={() => starCount(3)} class="fa-solid fa-star"></i>}
                                                {stars < 5 && <i id='noStar5' onClick={() => starCount(5)} class="fa-regular fa-star"></i>}
                                                {stars > 4 && <i id='star5' onClick={() => starCount(4)} class="fa-solid fa-star"></i>}

                                            </div>




                                            <button className='addRevSubmit'>Save</button>
                                        </form>

                                    </div>
                                    }
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="loading">Loading...</div>
        )
    }
}

export default SpotIDPage
