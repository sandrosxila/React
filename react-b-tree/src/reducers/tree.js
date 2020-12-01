import BTree from "./BTree";
let tree = new BTree(5);

const treeReducer = (state = [], action) => {

    switch (action.type) {
        case "INITIALIZE": {
            if(!isNaN(action.payload))
                tree = new BTree(parseInt(action.payload));
            return tree.bfs();
        }
        case "INSERT": {
            tree.insert(isNaN(action.payload) ? action.payload : parseInt(action.payload));
            return tree.bfs();
        }
        case "ERASE": {
            tree.erase(isNaN(action.payload) ? action.payload : parseInt(action.payload));
            return tree.bfs();
        }
        default:
            return state;
    }
}
export default treeReducer;