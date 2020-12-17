import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import Level from "./tree-nodes/Level";

function Scene(props) {

    const levels = useSelector(state => state.tree);

    const {setXById, boundsById} = props;

    const arrangePositions = (levels) => {
        // eslint-disable-next-line array-callback-return
        levels.map((levelItems, levelIndex) => {
            if (document.getElementById(`level-${levelIndex}`)) {
                let leftSum = 0;
                let lastParentIndex = -1;
                // eslint-disable-next-line array-callback-return
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
                            if (lastParentIndex !== nodes[0].parent) {
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

    const arrangeLines = (levels) => {
        // eslint-disable-next-line array-callback-return
        levels.map((levelItems, levelIndex) => {
            if (document.getElementById(`level-${levelIndex}`)) {
                // eslint-disable-next-line array-callback-return
                levelItems.map((nodes) => {
                    // eslint-disable-next-line array-callback-return
                    nodes.map(node => {
                        const {id, parent, parentElement, side} = node;
                        const end = document.querySelector(`#node-${id}`);
                        const start = document.querySelector(`.node-${parent}-${parentElement}-${side}`);
                        const line = document.querySelector(`.line-${parent}-${parentElement}-${side}`);
                        if (start && end && line) {
                            //first dot
                            const aX = 0;
                            const aY = 0;

                            //last dot
                            const bX = end.getBoundingClientRect().x + (end.getBoundingClientRect().width / 2) - start.getBoundingClientRect().x;
                            const bY = end.getBoundingClientRect().y - start.getBoundingClientRect().y;

                            // console.log(aX, aY);

                            //find center points;
                            const centerX = (aX + bX) / 2;
                            const centerY = (aY + bY) / 2;

                            //angle
                            const angle = Math.atan2(aY - bY, aX - bX) * 180 / Math.PI;

                            //distance
                            const distance = Math.sqrt(Math.pow((bX - aX), 2) + Math.pow((bY - aY), 2));

                            //bring all the work together
                            line.style.width = `${distance}px`;
                            line.style.transform = `rotate(${angle}deg)`;
                            line.style.top = `${centerY - (line.offsetHeight / 2)}px`;
                            line.style.left = `${centerX - (line.offsetWidth / 2)}px`;
                        }
                    })
                });
            }
        })
    }

    return (
        <div>
            {
                levels.map((level, key) => (
                    <Level key={key} clusters={level} level={key} isLeaf={levels.length - 1 === key} setXById={setXById}
                           boundsById={boundsById} arrangePositions={arrangePositions} arrangeLines={arrangeLines}/>
                ))
            }

        </div>
    );
}

export default Scene;