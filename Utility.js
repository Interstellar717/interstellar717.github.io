class Utility {
    static arrayRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static qs(q) {
        return document.querySelector(q);
    }

    static qsa(q) {
        return document.querySelectorAll(q);
    }

    static random(min, max) {
        if (min > max) throw new Error("Minimum value must be less than Maximum value");
        if (min < 0 || max < 0) throw new Error("Negative numbers are not yet supported");
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }

    static removeFromList(array, toRemove) {
        var temp = array.slice();
        for (let i of toRemove) {
            var index = temp.indexOf(i)
            if (index > -1) temp.splice(index, 1);
        }
        return temp;
    }
}