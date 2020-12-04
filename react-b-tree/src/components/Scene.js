import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import Level from "./tree-nodes/Level";

function Scene(props) {

    const levels = useSelector(state => state.tree);

    const {setXById, boundsById} = props;

    const arrangePositions = (levels) => {
        levels.map((levelItems, levelIndex) => {
            if (document.getElementById(`level-${levelIndex}`)) {
                let leftSum = 0;
                let lastParentIndex = -1;
                levelItems.map((nodes) => {
                    const leftNode = document.getElementById(`node-${nodes[0].id}`);
                    const rightNode = document.getElementById(`node-${nodes[nodes.length - 1].id}`);
                    const parentNode = document.getElementById(`node-${nodes[0].parent}`);
                    if (leftNode && rightNode && parentNode) {
                        // console.log(`node-${nodes[0].id} bounds:`, leftNodeBounds,`level-${level}: `,bounds.left);
                        const leftNodeBounds = leftNode.getBoundingClientRect();
                        const rightNodeBounds = rightNode.getBoundingClientRect();
                        const parentNodeBounds = parentNode.getBoundingClientRect();
                        if (setXById[`node-${nodes[0].parent}`]) {
                            setXById[`node-${nodes[0].parent}`](
                                (leftNodeBounds.left)
                                + ((rightNodeBounds.left + rightNodeBounds.width - leftNodeBounds.left) / 2)
                                - (leftSum)
                                - (parentNodeBounds.width / 2)
                            );
                            if(lastParentIndex !== nodes[0].parent) {
                                leftSum += parentNodeBounds.width;
                                // leftSum += (rightNodeBounds.left + rightNodeBounds.width - leftNodeBounds.left);
                                lastParentIndex = nodes[0].parent;
                            }
                            // console.log(`node-${nodes[0].parent}`, setXById[`node-${nodes[0].parent}`],
                            //     leftNodeBounds.left, leftSum);
                        }
                    }
                });
            }
        })
    }

    return (
        <div>
            {
                levels.map((level, key) => (
                    <Level key={key} clusters={level} level={key} isLeaf={levels.length - 1 === key} setXById={setXById}
                           boundsById={boundsById} arrangePositions={arrangePositions}/>
                ))
            }

        </div>
    );
}

export default Scene;