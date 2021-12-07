class Store {
    constructor() {
        this.subscribers = {};
        this.reducers = {};
        this.state = {};
        this.setReducer = this.setReducer.bind(this);
        this.setSubscriber = this.setSubscriber.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    setReducer(name, reducer, initState = {}) {
        this.reducers[name] = reducer;
        this.state[name] = initState;
    }

    setSubscriber(name, subscriber) {
        this.subscribers[name] = subscriber;
    }

    dispatch(action) {
        let reducersList = Object.keys(this.reducers);
        reducersList.forEach(reducer => {
            let currentState = this.state[reducer];
            let newState = this.reducers[reducer](currentState, action);
            this.state[reducer] = Object.assign({}, currentState, newState);
        });

        let subscribersList = Object.keys(this.subscribers);
        subscribersList.forEach(subscriber => {
            let listner = this.subscribers[subscriber];
            if(listner && typeof listner === 'function')
                listner(this.state, action);
        });
    }
}

export default Store;