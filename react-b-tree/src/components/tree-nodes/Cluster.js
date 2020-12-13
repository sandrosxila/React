import React, {useState, useEffect, useRef} from 'react';
import {useTransition, animated, config, useSpring} from 'react-spring';
import TreeNode from "./TreeNode";
import Level from "./Level";
import {useSelector} from "react-redux";

const Cluster = (props) => {
    const {level, isLeaf, nodes, id, boundsById, setXById, arrangePositions, arrangeLines} = props;
    // const levels = useSelector(state => state.tree);

    const [x, setX] = useState(0);

    const treeClusterProps = useSpring(isLeaf ?
        {
            position: 'relative',
            onRest: () => {
                // arrangePositions(levels);
            }
        } :
        {
            transform: `translate3d(${0}px,${0}px,0)`
        }
    );


    useEffect(() => {
        setXById[`cluster-${id}`] = setX;
    }, [id, setXById])

    return (
        <animated.div id={`cluster-${id}`} className={"col-auto"} style={treeClusterProps}>
            <div className="row flex-nowrap align-items-center">
                {
                    nodes.map((node, key) => (
                            <TreeNode key={key} id={node.id} isLeaf={node.isLeaf} elements={node.elements}
                                      setXById={setXById}
                                      boundsById={boundsById} level={level} arrangePositions={arrangePositions}
                                      parent={node.parent} parentElement={node.parentElement} side={node.side}
                                      arrangeLines={arrangeLines}
                            />
                        )
                    )
                }
            </div>
        </animated.div>
    );
};

export default Cluster;
