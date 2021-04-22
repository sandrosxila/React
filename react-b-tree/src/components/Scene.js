import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import Level from "./tree-nodes/Level";
import {themeParams, boundsById, setXById} from "../constants/constants";
import useWindowSize from "./custom-hooks/useWindowSize";

function Scene(props) {
    const levels = useSelector(state => state.tree);
    const themeIndex = useSelector(state => state.theme);
    const {sceneBackgroundClass} = themeParams[themeIndex];
    const {headerHeight} = props;
    const windowSize = useWindowSize();
    const [sceneHeight, setSceneHeight] = useState(windowSize.height - headerHeight);

    const sceneStyle = {
        position: 'relative',
        height: `${sceneHeight}px`,
        overflowX: 'auto'
    }

    useEffect(() => {
        setSceneHeight(windowSize.height - headerHeight);
    }, [windowSize.height, headerHeight]);

    return (
        <div className={sceneBackgroundClass} style={sceneStyle}>
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