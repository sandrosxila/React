import Element from "./Element";
import BNode from "./BNode";

class BTree {

    constructor(base) {
        this.base = base;
        this.root = new BNode();
        this.minElements = Math.floor((base + 1) / 2) - 1;
        this.size = 0;
        this.recentNode = null;
    }

//    split the b-Node and return new node
    split(node) {
        let newNode = new BNode();
        newNode.isLeaf = node.isLeaf;
        while (node.size() > Math.floor(this.base / 2)) {
            newNode.addFirst(node.popLast());
            if (newNode.first().hasLeftChild())
                newNode.first().leftChild.parent = newNode;
            if (newNode.first().hasRightChild())
                newNode.first().rightChild.parent = newNode;
        }
        return newNode;
    }

//    split up node and increase height of b-tree
    liftUp(node, parentIndex, side) {
        let parentElement = node.popAt(Math.floor(this.base / 2));
        let newNode = this.split(node);

        if (!node.hasParent()) {
            node.parent = new BNode();
            node.parent.isLeaf = false;
        }

        if (this.root === node)
            this.root = node.parent;

        newNode.parent = node.parent;
        parentElement.leftChild = node;
        parentElement.rightChild = newNode;

        node.parent.add(parentElement, parentIndex, side);
        node.parent.isLeaf = false;
    }

//    insert an element in b-tree
    insert(elem, current = this.root, parentIndex = -1, side = false) {
        if (current.empty()) {
            current.addFirst(new Element(elem));
            this.size++;
        } else if (elem >= current.last().value) {
            if (current.hasRightmostChild()) {
                this.insert(elem, current.getRightmostChild(), current.size() - 1, true);
            } else {
                current.addLast(new Element(elem));
                this.size++;
            }
        } else {
            for (let idx = 0; idx < current.size(); idx++) {
                if (elem < current.valueAt(idx)) {
                    if (current.hasLeftChildAt(idx)) {
                        this.insert(elem, current.leftChildAt(idx), idx, false);
                        break;
                    } else {
                        current.addAt(idx, new Element(elem));
                        this.size++;
                        break;
                    }
                }
            }
        }
        if (current.size() === this.base) {
            this.liftUp(current, parentIndex, side);
        }
    }

//    get right sibling node
    getRightSibling(node, side, parentPos) {
        if (node.hasParent()) {
            if (node.parent.hasRightChildAt(side ? parentPos + 1 : parentPos))
                return node.parent.at(side ? parentPos + 1 : parentPos).rightChild;
        }
        return null;
    }

//    get left sibling node
    getLeftSibling(node, side, parentPos) {
        if (node.hasParent()) {
            if (node.parent.hasLeftChildAt(side ? parentPos : parentPos - 1))
                return node.parent.at(side ? parentPos : parentPos - 1).leftChild;
        }
        return null;
    }

//    merge elements from right sibling to left sibling
    mergeToLeft(leftNode, rightNode) {
        if (!rightNode.empty()) {
            leftNode.last().rightChild = rightNode.getLeftmostChild();
            if (leftNode.hasRightmostChild())
                leftNode.last().rightChild.parent = leftNode;
            while (!rightNode.empty()) {
                leftNode.addLast(rightNode.popFirst());
                if (leftNode.last().leftChild != null)
                    leftNode.last().leftChild.parent = leftNode;
                if (leftNode.last().rightChild != null)
                    leftNode.last().rightChild.parent = leftNode;
            }
        }
        rightNode.parent = null;
        rightNode = null;
    }

//    merge elements from left sibling to right sibling
    mergeToRight(leftNode, rightNode) {
        if (!leftNode.empty()) {
            rightNode.first().leftChild = leftNode.getRightmostChild();
            if (rightNode.hasLeftmostChild())
                rightNode.first().leftChild.parent = rightNode;
            while (!leftNode.empty()) {
                rightNode.addFirst(leftNode.popLast());
                if (rightNode.first().leftChild !== null)
                    rightNode.first().leftChild.parent = rightNode;
                if (rightNode.first().rightChild !== null)
                    rightNode.first().rightChild.parent = rightNode;
            }
        }
        leftNode.parent = null;
        leftNode = null;
    }

//    shift one element from left child to parent and from parent to right child
    propagateFromLeftSibling(node, parentPos, leftSibling) {
        let nodeElement = node.parent.popAt(parentPos);
        nodeElement.leftChild = leftSibling.getRightmostChild();
        nodeElement.rightChild = node.hasLeftmostChild() ? node.getLeftmostChild() : this.recentNode;
        if (nodeElement.hasLeftChild())
            nodeElement.leftChild.parent = node;
        if (nodeElement.hasRightChild())
            nodeElement.rightChild.parent = node;
        node.addFirst(nodeElement);
        let parentElement = leftSibling.popLast();
        parentElement.leftChild = leftSibling;
        parentElement.rightChild = node;
        node.parent.addAt(parentPos, parentElement);
    }

//    shift one element from right child to parent and from parent to left child
    propagateFromRightSibling(node, parentPos, rightSibling) {
        let nodeElement = node.parent.popAt(parentPos);
        nodeElement.leftChild = node.hasRightmostChild() ? node.getRightmostChild() : this.recentNode;
        nodeElement.rightChild = rightSibling.getLeftmostChild();
        if (nodeElement.hasLeftChild())
            nodeElement.leftChild.parent = node;
        if (nodeElement.hasRightChild())
            nodeElement.rightChild.parent = node;
        node.addLast(nodeElement);
        let parentElement = rightSibling.popFirst();
        parentElement.leftChild = node;
        parentElement.rightChild = rightSibling;
        node.parent.addAt(parentPos, parentElement);
    }

//    push down parent node element to it's right child and then merge the children
    propagateDownFromLeft(node, parentPos, leftSibling) {
        let parentElement = node.parent.popAt(parentPos);
        if (node.parent.hasRightChildAt(parentPos - 1)) {
            node.parent.at(parentPos - 1).rightChild = node;
        }
        parentElement.leftChild = null;
        parentElement.rightChild = node.hasLeftmostChild() ? node.getLeftmostChild() : this.recentNode;
        node.addFirst(parentElement);
        node.isLeaf = node.isLeaf && leftSibling.isLeaf;
        this.mergeToRight(leftSibling, node);
        if (node.parent === this.root && this.root.size() === 0) {
            this.root = node;
            node.parent = null;
        }
    }

//    push down parent node element to it's left child and then merge the children
    propagateDownFromRight(node, parentPos, rightSibling) {
        let parentElement = node.parent.popAt(parentPos);
        if (node.parent.hasLeftChildAt(parentPos)) {
            node.parent.at(parentPos).leftChild = node;
        }
        parentElement.leftChild = node.hasRightmostChild() ? node.getRightmostChild() : this.recentNode;
        parentElement.rightChild = null;
        node.addLast(parentElement);
        node.isLeaf = node.isLeaf && rightSibling.isLeaf;
        this.mergeToLeft(node, rightSibling);
        if (node.parent === this.root && this.root.size() === 0) {
            this.root = node;
            node.parent = null;
        }
    }

//    restore minimum number of elements in node
    balance(node, parentPosition, side) {
        let leftSibling = this.getLeftSibling(node, side, parentPosition);
        let rightSibling = this.getRightSibling(node, side, parentPosition);

//        case 3: when leaf node has minimum number of elements and left-sibling with more than minimum number of elements
        if (leftSibling != null && leftSibling.size() > this.minElements)
            this.propagateFromLeftSibling(node, side ? parentPosition : parentPosition - 1, leftSibling);
//        case 4: when leaf node has minimum number of elements and right-sibling with more than minimum number of elements
        else if (rightSibling != null && rightSibling.size() > this.minElements)
            this.propagateFromRightSibling(node, side ? parentPosition + 1 : parentPosition, rightSibling);
//        case 5: when leaf node has minimum number of elements and left-sibling with minimum number of elements
        else if (leftSibling != null && leftSibling.size() <= this.minElements)
            this.propagateDownFromLeft(node, side ? parentPosition : parentPosition - 1, leftSibling);
//        case 6: when leaf node has minimum number of elements and right-sibling with minimum number of elements
        else if (rightSibling != null && rightSibling.size() <= this.minElements)
            this.propagateDownFromRight(node, side ? parentPosition + 1 : parentPosition, rightSibling);
        this.recentNode = node;
    }

//    take inorder predecessor and balance affected nodes excluding the root node of sub-tree
    takeInorderPredecessor(current, parentPosition, side, top = true) {
        let inorderPredecessor =
            current.hasRightmostChild() ?
                this.takeInorderPredecessor(current.getRightmostChild(), current.size() - 1, true, false)
                : current.popLast();
        if (!top && current.size() < this.minElements)
            this.balance(current, parentPosition, side);
        return inorderPredecessor;
    }

//    take inorder successor and balance affected nodes excluding the root node of sub-tree
    takeInorderSuccessor(current, parentPosition, side, top = true) {
        let inorderSuccessor =
            current.hasLeftmostChild() ?
                this.takeInorderSuccessor(current.getLeftmostChild(), 0, false, false) : current.popFirst();
        if (!top && current.size() < this.minElements)
            this.balance(current, parentPosition, side);
        return inorderSuccessor;
    }

//    different cases of deletion are implemented here
    eraseDispatch(node, position, parentPosition, side) {
        if (node.isLeaf) {
//            case 1: when leaf-node has more than minimum number of elements
            if (node.size() > this.minElements) {
                node.popAt(position);
            }
//            case 2: when leaf-node has not more than minimum number of elements
            else {
                node.popAt(position);
                this.balance(node, parentPosition, side);
            }
        } else {
//            case 7: when internal node has a left child
            if (node.hasLeftChildAt(position)) {
                let elem = node.at(position);
                let inorderPredecessor = this.takeInorderPredecessor(elem.leftChild, position, false);
                inorderPredecessor.leftChild = elem.leftChild;
                inorderPredecessor.rightChild = elem.rightChild;
                node.popAt(position);
                node.addAt(position, inorderPredecessor);
                if (node.leftChildAt(position).size() < this.minElements)
                    this.balance(node.leftChildAt(position), position, false);
            }
//            case 8: when internal node has a right child
            else if (node.hasRightChildAt(position)) {
                let elem = node.at(position);
                let inorderSuccessor = this.takeInorderSuccessor(elem.rightChild, position, true);
                inorderSuccessor.leftChild = elem.leftChild;
                inorderSuccessor.rightChild = elem.rightChild;
                node.popAt(position);
                node.addAt(position, inorderSuccessor);
                if (node.rightChildAt(position).size() < this.minElements)
                    this.balance(node.rightChildAt(position), position, true);
            }
        }
    }

//    deletion of element
    erase(elem, current = this.root, parentIndex = -1, side = false, isRoot = true) {
        this.recentNode = null;
        if (current.empty()) {
            return;
        } else if (elem > current.last().value) {
            if (current.hasRightmostChild()) {
                this.erase(elem, current.getRightmostChild(), current.size() - 1, true, false);
            } else {
                return;
            }
        } else {
            for (let idx = 0; idx < current.size(); idx++) {
                if (elem === current.valueAt(idx)) {
                    this.eraseDispatch(current, idx, parentIndex, side);
                    this.size--;
                    break;
                } else if (elem < current.valueAt(idx)) {
                    if (current.hasLeftChildAt(idx)) {
                        this.erase(elem, current.leftChildAt(idx), idx, false, false);
                        break;
                    } else {
                        return;
                    }
                }
            }
        }
        if (!isRoot && current.size() < this.minElements) {
            this.balance(current, parentIndex, side);
        }
        this.recentNode = current;
    }

    print_all(current = this.root) {
        current.elements.forEach(
            i => {
                if (i.hasLeftChild())
                    this.print_all(i.leftChild);
                process.stdout.write(`${i.value} `);
            }
        )


        if (current.hasRightmostChild())
            this.print_all(current.last().rightChild);
    }

    bfs(root = this.root) {
        let nodes = [];
        let queue = [{
            id: 0,
            level: 0,
            node: root,
            parent: -1,
            parentElement: 0,
            side: 'left'
        }];
        let lastParent = -2;
        for (let i = 0; queue.length !== 0;) {
            const {id, level, node, parent,parentElement,side} = queue.shift();
            // console.log("node is here:",node);
            node.elements.forEach(
                (element, index) => {
                    if (element.hasLeftChild()) {
                        i++;
                        queue.push({
                            id: i,
                            level: level + 1,
                            node: element.leftChild,
                            parent: id,
                            parentElement: index,
                            side: 'left'
                        });
                    }
                }
            )
            if (node.hasRightmostChild()) {
                i++;
                queue.push({
                    id: i,
                    level: level + 1,
                    node: node.last().rightChild,
                    parent: id,
                    parentElement: node.size() - 1,
                    side: 'right'
                });
            }

            if (typeof nodes[level] === 'undefined') {
                nodes.push([]);
            }

            if (lastParent !== parent) {
                nodes[level].push([]);
                lastParent = parent;
            }
            // console.log("nodes level",nodes[level]);
            nodes[level][nodes[level].length - 1].push({
                id,
                elements: [...node.elements.map(element => element.value)],
                level,
                parent,
                isLeaf: node.isLeaf,
                parentElement,
                side
            });
        }

        return nodes;
    }
}

export default BTree;