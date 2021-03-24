import React, {useState, useEffect} from 'react';
import {animated, useSpring} from 'react-spring';
import TreeNode from "./TreeNode";

const Cluster = (props) => {
    const {level, isLeaf, nodes, id, boundsById, setXById} = props;

    const [x, setX] = useState(0);

    const treeClusterProps = useSpring(isLeaf ?
        {
            position: 'relative',
        } :
        {
            transform: `translate3d(${0}px,${0}px,0)`,
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
                            <TreeNode
                                key={key}
                                setXById={setXById}
                                boundsById={boundsById}
                                level={level}
                                id={node.id}
                                isLeaf={node.isLeaf}
                                elements={node.elements}
                                parent={node.parent}
                                parentElement={node.parentElement}
                                side={node.side}
                            />
                        )
                    )
                }
            </div>
        </animated.div>
    );
};

export default Cluster;
