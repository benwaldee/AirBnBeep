
import { Modal, useModalContext } from '../../context/Modal';

import './Review.css';

function Review({ sessionUser }) {

    const { showReviewModal, setShowReviewModal } = useModalContext();

    const onX = () => {
        setShowReviewModal(false)

    }




    return (
        <div className='Review_alert'>
            <div className='Review_top'>
                <div onClick={onX} className="Review_x">X</div>
                <div className='Review_name'>{sessionUser.firstName}</div>
                <div></div>
            </div>
            <div className="Review_text">You have already reviewed this spot!</div>

        </div>
    );
}

export default Review;
