// action types
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_ORDER_ITEMS = 'SET_ORDER_ITEMS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_QUANTITY = 'SET_QUANTITY';
export const NOTIFY = 'NOTIFY';
export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const DEQUEUE_NOTIFICATION = 'DEQUEUE_NOTIFICATION';

// actions creator functions
export const fetchData = (api, action) => (dispatch) => {
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      dispatch(action(data));
    })
    .catch((err) => console.log(err));
};

export const setProducts = (items) => {
  return {
    type: SET_PRODUCTS,
    payload: {
      items
    }
  };
};

export const setOrders = (data) => {
  const orders = data.reduce((acc, cur) => {
    if (acc[cur.id]) {
      acc[cur.id].push(cur);
    } else {
      acc[cur.id] = [cur];
    }
    return acc;
  }, {});

  return {
    type: SET_ORDERS,
    payload: {
      orders
    }
  };
};

export const addToCart = (itemId) => {
  return {
    type: ADD_TO_CART,
    payload: {
      quantity: 1,
      itemId
    }
  };
};

export const removeFromCart = (itemId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      itemId
    }
  };
};

export const setQuantity = (itemId, quantity) => {
  return {
    type: SET_QUANTITY,
    payload: {
      itemId,
      quantity
    }
  };
};

export const notify = (message, dismissTime = 5000) => (dispatch) => {
  const uuid = Math.random();
  dispatch(enqueueNotification(message, dismissTime, uuid));
  setTimeout(() => {
    dispatch(dequeueNotification());
  }, dismissTime);
};

export const enqueueNotification = (message, dismissTime, uuid) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid
    }
  };
};

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION
  };
};
