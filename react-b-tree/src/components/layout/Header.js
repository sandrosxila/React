import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {insert, initialize, erase, undo, redo} from "../../actions/index";
import {findElement} from "../../functions/motorics";
import {range} from "../../functions/helpers";
import useMeasure from "react-use-measure";

const Header = props => {

    const {headerHeightSetter} = props;

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [selectValue, setSelectValue] = useState('Degree');
    const levels = useSelector(state => state.tree);
    const optionValues = range({start: 3, stop: 10});
    const [ref, bounds] = useMeasure()

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onInsertButtonClick();
    }

    const onInsertButtonClick = () => {
        if (inputValue.length > 0) {
            dispatch(insert(inputValue));
        }
        setInputValue('');
    }

    const onEraseButtonClick = () => {
        if (inputValue.length > 0)
            dispatch(erase(inputValue));
        setInputValue('');
        inputRef.current.focus();
    }

    const onFindButtonClick = () => {
        if (inputValue.length > 0)
            findElement(isNaN(inputValue) ? inputValue : parseFloat(inputValue), levels);
        setInputValue('');
    }

    const onClearButtonClick = () => {
        dispatch(initialize(selectValue === 'Degree' ? '5' : selectValue));
    }

    const onSelectChange = (e) => {
        setSelectValue(e.target.value);
    }

    const onUndoButtonClick = () => {
        dispatch(undo());
    }

    const onRedoButtonClick = () => {
        dispatch(redo());
    }

    //this effect will be invoked as we change the value of degree in dropdown menu
    useEffect(() => {
        dispatch(initialize(selectValue));
    }, [selectValue, dispatch])

    useEffect(() => {
        headerHeightSetter(bounds.height);
    }, [bounds, headerHeightSetter]);

    return (
        <div ref={ref}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="." onClick={e => e.preventDefault()}>B-tree Visualization</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <form className="form-inline d-inline-flex" onSubmit={onSubmit}>
                        <ul className="navbar-nav mr-auto">
                            <div>
                                <input id="input" className="form-control form-control-sm mx-1 w-25" type="text"
                                       aria-label="Insertion" value={inputValue} ref={inputRef}
                                       onChange={onInputChange}/>
                                {/*insertion*/}
                                <button className="btn btn-sm btn-outline-success mr-2" onClick={onInsertButtonClick}>
                                    Insert
                                </button>
                                {/*deletion*/}
                                <button className="btn btn-sm btn-outline-danger mr-2" onClick={onEraseButtonClick}>
                                    Erase
                                </button>
                                {/*find*/}
                                <button className="btn btn-sm btn-outline-info mr-2" onClick={onFindButtonClick}>
                                    Find
                                </button>
                                {/*clear*/}
                                <button className="btn btn-sm btn-outline-secondary mr-2" onClick={onClearButtonClick}>
                                    Clear
                                </button>
                                <select id="degree" className="custom-select custom-select-sm"
                                        value={selectValue}
                                        onChange={onSelectChange}>
                                    <option className="dropdown-item" value="Degree" disabled={true} hidden={true}>
                                        Degree
                                    </option>
                                    {
                                        optionValues.map((degree, index) => (
                                                <option className="dropdown-item" value={`${degree}`} key={index}>
                                                    {degree}
                                                </option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-outline-warning text-dark mr-2" onClick={onUndoButtonClick}>
                                    <i>
                                        Undo
                                    </i>
                                </button>
                                <button className="btn btn-sm btn-outline-warning text-dark mr-2" onClick={onRedoButtonClick}>
                                    <i>
                                        Redo
                                    </i>
                                </button>
                            </div>
                        </ul>
                    </form>
                </div>
            </nav>
        </div>
    );
};

export default Header;
