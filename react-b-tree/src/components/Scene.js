import React from 'react';
import {useSelector} from "react-redux";
import Level from "./tree-nodes/Level";
import {boundsById, setXById} from "../constants/constants";

function Scene(props) {
    const levels = useSelector(state => state.tree);
    return (
        <div>
            {
                levels.map((level, key) => (
                    <Level
                        key={key}
                        clusters={level}
                        level={key}
                        isLeaf={levels.length - 1 === key}
                        setXById={setXById}
                        boundsById={boundsById}/>
                ))
            }

        </div>
    );
}

export default Scene;