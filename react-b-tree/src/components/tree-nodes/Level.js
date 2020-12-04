import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import useMeasure from 'react-use-measure';
import {useTransition, animated, config, useSpring} from 'react-spring';
import Cluster from "./Cluster";

function Level(props) {
    const {level, clusters, isLeaf, boundsById, setXById, arrangePositions} = props;

    const [ref, bounds] = useMeasure();

    const [x, setX] = useState(window.innerWidth / 2);
    const [y, setY] = useState(5 + level * (window.innerHeight / 8));

    // const levels = useSelector(state => state.tree);

    const treeLevelProps = useSpring(
        {
            opacity: 1,
            position: 'absolute',
            transform: `translate3d(${isLeaf ? Math.max(0, x) : 0}px,${y}px,0)`,
            lineHeight: `${window.innerHeight / 2 / 7.5 / 1.5}px`,
            height: `${window.innerHeight / 15}px`,
            config: {duration: isLeaf ? 735 : 0},
            from: {
                opacity: 0,
                transform: `translate3d(${x}px,${y}px,0)`
            },
            onStart: () => {
                // arrangePositions(levels);
            }
        }
    );

    useEffect(() => {
        if (isLeaf) {
            setX(Math.max(bounds.width / 2, window.innerWidth / 2));
        }
        setX((window.innerWidth / 2) - (bounds.width / 2));
        boundsById[`level-${level}`] = bounds;
    }, [bounds, boundsById, isLeaf, level]);

    // useEffect(() => {
    //     console.log(`level-${level}: `, bounds.left);
    // }, [bounds, level]);

    return (
        <animated.div className={"row flex-nowrap"} id={`level-${level}`} ref={ref} style={treeLevelProps}>
            {
                clusters.map((cluster, key) => (
                    <Cluster key={key} id={cluster[0].parent + 1} level={level} nodes={cluster} isLeaf={isLeaf}
                             setXById={setXById} boundsById={boundsById} arrangePositions={arrangePositions}/>
                ))
            }
        </animated.div>
    );
}

export default Level;