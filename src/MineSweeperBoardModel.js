class BoardModel {
    constructor (options) {
        const defaults = {
            gameStateText : "Game in progress...",
            resetButtonVisibility : "hidden",
            cellsDisabled : false,
        };

        let opts = Object.assign({}, defaults, options);

        Object.keys(defaults).forEach(prop => {
            this[prop] = opts[prop];

        });
        console.log(this.valueOf().gameStateText);
        const callbacks = [];
        const data = {
            add_callback: function add_callback (fn) {
                callbacks.push(fn)
            }
        };

        const proxy = new Proxy(data, {
            set: function (target, property, value) {
                target[property] = value;
                callbacks.forEach((callback) => callback());
                return true;
            },

            get: function (target, property) {
                return target[property];
            }
        });

        return proxy
    }
}