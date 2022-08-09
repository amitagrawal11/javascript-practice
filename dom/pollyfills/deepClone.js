function querySelector(str) {
    const root = document.body;
    function recurse(node) {
        if (!node) return node;
        for (let child of node.children) {
            if (child.matches(str)) {
                return child;
            } else {
                return recurse(child);
            }
        }
    }
    return recurse(root);
}