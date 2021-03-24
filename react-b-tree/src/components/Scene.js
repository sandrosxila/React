import React from 'react';
import {useSelector} from "react-redux";
import Level from "./tree-nodes/Level";

function Scene(props) {

    const levels = useSelector(state => state.tree);

    const {setXById, boundsById} = props;

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