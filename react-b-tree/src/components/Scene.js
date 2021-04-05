import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import Level from "./tree-nodes/Level";
import {boundsById, setXById} from "../constants/constants";
import useWindowSize from "./custom-hooks/useWindowSize";

function Scene(props) {
    const levels = useSelector(state => state.tree);
    const {headerHeight} = props;
    const windowSize = useWindowSize();
    const [sceneHeight, setSceneHeight] = useState(windowSize.height - headerHeight);

    useEffect(() => {
        setSceneHeight(windowSize.height - headerHeight);
    }, [windowSize.height, headerHeight]);

    return (
        <div className={'p-2'} style={{position: 'relative', height: `${sceneHeight}px`, overflowX: 'auto'}}>
            {
                levels.map((level, key) => (
                    <Level
                        key={key}
                        clusters={level}
                        level={key}
                        isLeaf={levels.length - 1 === key}
                        setXById={setXById}
                        boundsById={boundsById}
                    />
                ))
            }

        </div>
    );
}

export default Scene;