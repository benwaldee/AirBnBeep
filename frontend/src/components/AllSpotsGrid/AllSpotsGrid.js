import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import SpotCard from './SpotCard'
import './AllSpotsGrid.css'
import { Modal, useModalContext } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

const AllSpotsGrid = () => {

    const { showLoginFormSpotCard, setShowLoginFormSpotCard } = useModalContext();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [])

    let spotObj = useSelector((state) => state?.spots?.allSpots)
    let sessionUser = useSelector((state) => state?.session?.user)

    let spotArr
    if (spotObj) { spotArr = Object.values(spotObj) }


    return (
        <div id='outerAllSpotsDiv'>
            <div id='innerAllSpotsDiv'>
                {spotArr?.map((spot) => {
                    return (
                        <SpotCard key={spot.id} spot={spot} sessionUser={sessionUser} />
                    )
                })}
            </div>
            {!sessionUser && showLoginFormSpotCard && (
                <Modal onClose={() => {
                    setShowLoginFormSpotCard(false)

                }}>
                    <LoginForm />
                </Modal>
            )}
        </div>
    )
}

export default AllSpotsGrid
