import React, {useState, useEffect, useRef} from 'react';
import {useTransition, animated, config, useSpring} from 'react-spring';
import TreeNode from "./TreeNode";
import Level from "./Level";

const Cluster = (props) => {
    const {level, isLeaf, nodes, id, boundsById,setXById} = props;

    const [x, setX] = useState(0);

    const treeClusterProps = useSpring( isLeaf?
        {
            position:  'relative',
        }:
        {
            transform: `translate3d(${0}px,${0}px,0)`
        }
) ;


    useEffect(() => {
        setXById[`cluster-${id}`] = setX;
    },[id, setXById])

    return (
        <animated.div  className={"col-auto"} style={treeClusterProps}>
            <div id={`cluster-${id}`} className="row flex-nowrap align-items-center">
                {
                    nodes.map((node, key) => (
                            <TreeNode key={key} id={node.id} isLeaf={isLeaf} elements={node.elements} setXById={setXById} boundsById={boundsById} level={level}/>
                        )
                    )
                }
            </div>
        </animated.div>
    );
};

export default Cluster;
