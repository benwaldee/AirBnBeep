import { addSpotThunk } from '../../store/spots'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import img from '../LoginFormModal/x.jpg'
import exclImg from '../LoginFormModal/excl.PNG'
import './AddSpotForm.css'

const AddSpotForm = ({ showAddSpot, setShowAddSpot, clickedEdit, setClickedEdit, }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    // const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState([]);
    const [charCount, setCharCount] = useState(0)

    const onX = () => {
        setShowAddSpot(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        dispatch(addSpotThunk({ name, price, description, city, country, state, address, lat: 100.0, lng: 100.0 }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                    // for (let error of data.errors) {
                    //     if (error === 'Password must be 6 characters or more.') {
                    //         setPassword('')
                    //         setConfirmPassword('')
                    //     }

                    // }
                };
            });


        setShowAddSpot(false)

        return
    }


    return (
        <div className='outer_divAddSpot'>
            <div className="inner_divAddSpot">
                <div className='wrapAddSpot'>
                    <img className='addSpotX' onClick={onX} src={img}></img>
                    <div className='addSpotTitle'>Create a Listing</div>
                    <div className='nudgeAddSpot'></div>
                </div>
                <div id='errorDivAddSpot'>

                    {errors.map((error, idx) => {
                        return (
                            <div id='alignIndAddSpot'>
                                <span>
                                    <img id='errorImgAddSpot' src={exclImg}></img>
                                </span>
                                <div className='oneErrorDivAddSpot' key={idx}>{error}</div>
                            </div>
                        )
                    })}

                </div>
                <form className='formAddSpot' onSubmit={handleSubmit}>
                    <div>
                        <input
                            id='addSpotName'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Listing Name"
                        />
                    </div>
                    <div>
                        <input
                            id='addSpotAddress'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Address"
                        />

                    </div>
                    <div>
                        <input
                            id='addSpotCity'
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="City"
                        />
                    </div>
                    <div>
                        <input
                            id='addSpotState'
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder="State"
                        />
                    </div>
                    <div>
                        <input
                            id='addSpotCountry'
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder="Country"
                        />
                    </div>
                    <div>
                        <input
                            id='addSpotPrice'
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="Price"
                        />
                    </div>
                    <div>
                        <textarea
                            id='addSpotDescription'
                            value={description}
                            onChange={(e) => {

                                setDescription(e.target.value)
                                setCharCount(e.target.value.length)
                            }}
                            required
                            placeholder="Description"
                            maxLength={500}
                        />
                        <div className='charCount'>{charCount}/500</div>
                    </div>
                    {/* <div>
                        <input
                        id='addSpotPreviewImage'
                            type='text'
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            required
                            placeholder="Link for Preview Image"
                        />
                    </div> */}
                    <button id='submitAddSpot' type="submit">Create Listing!</button>
                </form>
            </div>
        </div>
    )
}


export default AddSpotForm
