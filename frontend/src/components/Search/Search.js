import './Search.css';
import search from './search.png'
import quesion from './question.png'
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from "../../store/spots"
import { Modal, useModalContext } from '../../context/Modal';

function Search({ allSpots }) {

    const { searchToggle, setSearchToggle, userSearch, setUserSearch } = useModalContext();

    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [])

    allSpots = useSelector(state => state?.spots?.allSpots)
    if (allSpots) {
        allSpots = Object.values(allSpots)
    }

    const handleSearch = (id) => {

        history.push(`/spots/${id}`)
        setUserSearch("")
        setSearchToggle(!searchToggle)

    }

    return (
        <div className='Search_outer'>
            <img className='Search_icon' src={search}></img>
            <input
                className='Search_input'
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                required
                placeholder='Search spots by name...'
            >
            </input>
            <div className='Search_results'>
                {userSearch && allSpots
                    .filter((spot) => spot?.name?.toLowerCase().startsWith(userSearch.toLowerCase()))
                    .slice(0, 5)
                    .map(ele => (
                        <div key={ele.id} className="Search_card" onClick={() => handleSearch(ele.id)}>
                            <img className='Search_cardImg' src={ele.previewImage}></img>
                            <div className='Search_cardLower'>
                                <div className='Search_cardTitle'>{ele.name}</div>
                                <div className='Search_cardSub'>{ele.city},{ele.state}</div>
                            </div>

                        </div>
                    ))
                }
                {userSearch && allSpots
                    .filter((spot) => spot?.name?.toLowerCase().startsWith(userSearch.toLowerCase())).length === 0 &&

                    <div className="Search_cardNull" >
                        <img className='Search_cardImg' src={quesion}></img>
                        <div className='Search_cardLower'>
                            <div className='Search_cardTitle'>No Results</div>
                            <div className='Search_cardSub'>Check your spelling</div>
                        </div>

                    </div>

                }

            </div>


        </div >
    );
}

export default Search;
