// one way of doing this
function clearAllTimeout() {
    const id = window.setTimeout(function () { }, 0);
    while (--id) {
        window.clearTimeout(id);
    }
}

// another way of doing this
function clearAllTimeout() {
    const ids = [];
    const oldSetTimeout = window.setTimeout;
    window.setTimeout = function () {
        ids.push(oldSetTimeout.apply(this, arguments));
    }
}