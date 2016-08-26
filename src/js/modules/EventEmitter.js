export class EventEmitter {

    constructor() {
        this.events = new Map();
    }

    _addEvent(event, callback, context) {
        if (this._hasEvent(event)) {
            let callbackAlreadyHave = this._getEvent(event).some(item => {
                return !functionsIsEqual(item, callback, context);
            });


            if (callbackAlreadyHave) {
                this._getEvent(event).push({ fn: callback, ctx: context });
            }
        } else {
            this.events.set(event, [{ fn: callback, ctx: context }]);
        }
    }

    _removeEvent(event, callback, context) {
        if (this._hasEvent(event)) {
            this._getEvent(event).forEach( (item, i) => {
                if (functionsIsEqual(item, callback, context)) {
                    this._getEvent(event).splice(i, 1);
                }
            });
        }
    }

    _activateEvent(event, ...args) {
        if (this._hasEvent(event)) {
            this._getEvent(event).forEach(item => {
                item.fn.apply(item.ctx, ...args);
            });
        }
    }

    _getEvent(event) {
        return this.events.get(event);
    }

    _hasEvent(event) {
        return this.events.has(event);
    }


    on(event, callback, context) {
        return this._addEvent(event, callback, context);
    }

    un(event, callback, context) {
        return this._removeEvent(event, callback, context);
    }

    emit(event, ...args) {
        return this._activateEvent(event, ...args);
    }
}

function functionsIsEqual(item, callback, context) {
    return item.fn == callback && item.ctx == context;
}
