import './SpotIDPage.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllSpotsThunk, getSpotByIDThunk } from '../../store/spots'

const SpotIDPage = () => {

    // const [spotIDSpot, setspotIDSpot] = useState(null)

    let { spotID } = useParams()
    spotID = parseInt(spotID)

    const dispatch = useDispatch()

    const oneSpot = useSelector((state) => state.spots?.oneSpot)

    useEffect(() => {
        dispatch(getSpotByIDThunk(spotID))
    }, [])


    if (oneSpot) {
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
