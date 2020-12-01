import React , {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import TreeNode from "./tree-nodes/TreeNode";

function Scene(props) {

    const nodes = useSelector(state => state.tree);

    useEffect(()=> {
        // console.log(nodes);
    }, [nodes]);

    return (
        <div>
            {
                nodes.map( (node, key) => (
                    <TreeNode key={key} elements={node.elements} level={node.level}/>
                ))
            }

        </div>
    );
}

export default Scene;