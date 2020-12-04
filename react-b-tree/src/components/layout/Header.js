import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {insert, initialize, erase} from "../../actions/index";

const Header = props => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(null);

    const {setXById, boundsByID} = props;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">B-tree Visualization</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <input id="input" className="form-control form-control-sm mx-1 w-50" type="text" aria-label="Insertion" onChange={
                            (e) => {
                                setValue(e.target.value);
                            }
                        }/>
                        {/*insertion*/}
                        <button className="btn btn-sm btn-outline-success mr-2" onClick={() => {
                            if(document.getElementById('input').value.length > 0){
                                dispatch(insert(value));
                            }

                            document.getElementById('input').value = '';
                        }}>Insert</button>
                        {/*deletion*/}
                        <button className="btn btn-sm btn-outline-danger mr-2" onClick={() => {
                            if(document.getElementById('input').value.length > 0)
                                dispatch(erase(value));
                            document.getElementById('input').value = '';
                        }}>Erase</button>
                        {/*find*/}
                        <button className="btn btn-sm btn-outline-info mr-2">Find</button>
                        {/*clear*/}
                        <button className="btn btn-sm btn-outline-secondary mr-2" onClick={() => {
                            dispatch(initialize(document.getElementById('degree').value))
                        }}>Clear</button>

                        <select id="degree" className="custom-select custom-select-sm" defaultValue={"Degree"} onChange={
                            e => {
                                console.log(dispatch(initialize(e.target.value)));
                            }
                        }>
                            <option className="dropdown-item" value="Degree" disabled hidden>Degree</option>
                            {
                                Array.from({length: 8}, (_, i) => i+3).map((degree,index) => (
                                        <option className="dropdown-item" value={`${degree}`} key={index}>
                                            {degree}
                                        </option>
                                    )
                                )
                            }

                        </select>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
