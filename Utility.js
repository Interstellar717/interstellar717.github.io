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

	static crel(q) {
		const tag = q.split(".")[0].split("#")[0].split("[")[0];
		const id = q.split("#").length > 1 ? q.split("#")[1].split(".")[0].split("[")[0] : "";
		const className = q.split(".").length > 1 ? [...q.split(".").slice(1, -1), q.split(".")[q.split(".").length - 1].split("#")[0].split("[")[0]] : "";

		if (q.split("[").length > 1 && q.split("]").length < 2 || q.split("[").length < 2 && q.split("]").length > 1)
			throw new Error("Invalid query sequence (attributes must be within [])");

		if (q.split("|").length > 1 && q.split("|").length < 3 || q.split("|").length > 3)
			throw new Error("Invalid query sequence (styling must be within ||)");

		const attributes = q.split("[").length > 1 && q.split("]").length > 1 ? Object.assign({}, ...q.split("[")[1].split("]")[0].split(",").map(e => ({ [Utility.removePadding(e.split("=")[0])]: Utility.removePadding(e.split("=")[1]) }))) : [];
		const style = q.split("|").length > 1 ? Object.assign({}, ...q.split("|")[1].split("|")[2].split(";").map(e => ({ [Utility.removePadding(e.split(":")[0])]: Utility.removePadding(e.split(":")[1]) }))) : [];

		// console.log(tag);
		// console.log(id);
		// console.log(className);
		// console.log(attributes);

		const result = document.createElement("tag");
		className.length && className.forEach(e => result.classList.add(e));
		id && (result.id = id);
		attributes.length && Object.keys(attributes).forEach(e => result.setAttribute(e, attributes[e]));
		style.length && Object.keys(style).forEach(e => result.style.setProperty(e, style[e]));

		return result;
	}

	static removePadding(str) {
		while (str.startsWith(" ")) str = str.slice(1);
		while (str.endsWith(" ")) str = str.slice(0, -1);
		return str;
	}
}
