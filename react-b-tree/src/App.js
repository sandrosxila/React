import React from "react"
import Scene from "./components/Scene";
import Header from "./components/layout/Header";
import {useSelector} from "react-redux";
import './App.css'

function App() {
    const grads = [
        "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
        "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
        "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
        "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)",
        "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
        "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
        "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
        "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
        "linear-gradient(45deg, blue 20%, fuchsia)"
    ];
    const boundsById = {};
    const setXById = {};
    const levels = useSelector(state => state.tree);

    const findElement = (element, levels, currentLevel = 0, currentCluster = 0, currentNode = 0, idx = 0) => {
        const node = levels[currentLevel][currentCluster][currentNode];
        if (!node || idx >= node.elements.length)
            return;

        const nextCluster = () => {
            let leftIndex = 0;
            for(let i = 0; i < currentCluster; i++){
                leftIndex += levels[currentLevel][i].length;
            }
            return leftIndex + currentNode;
        }
        const getDomElement = (id, index) => document.getElementById(`element-${id}-${index}`);
        const getLeftLine = (id, index) => document.querySelector(`.line-${id}-${index}-left`);
        const getRightLine = (id, index) => document.querySelector(`.line-${id}-${index}-right`);
        const nodeElement = node.elements[idx];

        console.log(currentLevel, currentCluster, currentNode, idx, nodeElement);
        console.log(document.getElementById(`element-${node.id}-${idx}`));

        getDomElement(node.id, idx).classList.add('flash-it');
        if (element === nodeElement) {
            setTimeout(() => {
                getDomElement(node.id, idx).classList.remove('flash-it');
            }, 1500);
            return;
        }
        if (element < nodeElement) {
            getLeftLine(node.id, idx).classList.add('flash-it');
            if (idx > 0) {
                getDomElement(node.id, idx).classList.remove('flash-it');
                getLeftLine(node.id, idx).classList.remove('flash-it');
                if(!node.isLeaf)
                    findElement(element, levels, currentLevel + 1, nextCluster(), idx, 0);
            } else {
                setTimeout(() => {
                    getDomElement(node.id, idx).classList.remove('flash-it');
                    getLeftLine(node.id, idx).classList.remove('flash-it');
                    if(!node.isLeaf)
                        findElement(element, levels, currentLevel + 1, nextCluster(), idx, 0);
                }, 1500);
            }
            return;
        }
        if (idx + 1 < node.elements.length) {
            setTimeout(() => {
                getDomElement(node.id, idx).classList.remove('flash-it');
                if(!node.isLeaf)
                    findElement(element, levels, currentLevel, currentCluster, nextCluster(), idx + 1);
            }, 1500);
        }

        if (idx === node.elements.length - 1 && element > node.elements[idx]) {
            getRightLine(node.id, idx).classList.add('flash-it');
            setTimeout(() => {
                getDomElement(node.id, idx).classList.remove('flash-it');
                getRightLine(node.id, idx).classList.remove('flash-it');
                if(!node.isLeaf)
                    findElement(element, levels, currentLevel + 1, nextCluster(), node.elements.length, 0);
            }, 1500);
        }
    }

    return (
        <div>
            <Header setXById={setXById} boundsById={boundsById} findElement={findElement}/>
            <Scene boundsById={boundsById} setXById={setXById}/>
        </div>
    )
}

export default App;
