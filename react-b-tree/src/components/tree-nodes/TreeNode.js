import React, {useEffect, useState} from 'react';
import {animated, config, useSpring, useTransition} from 'react-spring';
import {useSelector} from "react-redux";


function TreeNode(props) {

    const {elements, isLeaf, id, boundsById, setXById, arrangePositions} = props;
    const levels = useSelector(state => state.tree);


    const [x, setX] = useState(0);

    const treeNodeProps = useSpring({
        background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
        height: `${window.innerHeight / 15}px`,
        position: 'relative',
        transform: `translate3d(${x + 15}px,${0}px,0)`,
        onRest: () => {
            if(isLeaf)
                setX(0);
            arrangePositions(levels);
        }
    });

    const elementTransitions = useTransition(elements, item => item, {
        config: {duration: 1000, ...config.gentle},
        from: {
            opacity: 0,
            maxWidth: '0px',
        },
        enter: {
            opacity: 0.8,
            height: `${window.innerHeight / 15 / 1.5}px`,
            background: "rgba(0, 0, 0, 0) linear-gradient(-225deg, rgba(227, 253, 245, 0.32) 0%, rgba(255, 230, 250, 0.79) 100%) repeat scroll 0% 0%",
            textAlign: "center",
            lineHeight: `${window.innerHeight / 15 / 1.5}px`,
            maxWidth: '2000px'
        },
        leave: {
            display: 'none',
        }
    });

    useEffect(() => {
        setXById[`node-${id}`] = setX;
    },[id, setXById]);

    // useEffect(() => {
    //     if(isLeaf)
    //         setX(0);
    //     console.log(`node-${id} changed:`, isLeaf);
    // },[isLeaf]);

    return (
        <animated.div className={isLeaf ? "col-auto mr-1" : "col-auto"} id={`node-${id}`} style={treeNodeProps}>
            <div className="row p-1 align-items-center"  style={{height: `${window.innerHeight / 15}px`}}>
                {
                    elementTransitions.map((({item, key, props},idx) => (
                            <animated.div className="col mx-1" key={idx} style={
                                props
                            }>
                                {item}
                            </animated.div>
                        )
                    ))
                }
            </div>
        </animated.div>
    );
}

export default TreeNode;