import axios from "axios";

export const OrdersApiService = (() => {
  const { REACT_APP_ORDERS_API_KEY, REACT_APP_ORDERS_API_KEY_HEADER } = process.env;
  const getHeaders = () => {
    const headers: any = {};
    if (REACT_APP_ORDERS_API_KEY && REACT_APP_ORDERS_API_KEY_HEADER) {
      headers[REACT_APP_ORDERS_API_KEY_HEADER] = REACT_APP_ORDERS_API_KEY;
    }

    return headers;
  };

  return {
    cancelOrders: async (ordersId: string) => {
      axios.post(`/orders/${ordersId}`, {
        status: 'CANCELLED'
      }, {
        baseURL: process.env.REACT_APP_ORDERS_SERVICE,
        headers: getHeaders()
      }).then((result) => {
        // Should rerender UI instead of force reload
        window.location.reload();
      });
    },
    deleteOrders: (ordersId: string) => {
      axios.delete(`/orders/${ordersId}`, {
        baseURL: process.env.REACT_APP_ORDERS_SERVICE,
        headers: getHeaders()
      }).then((result) => {
        // Should rerender UI instead of force reload
        window.location.reload();
      });
    },
    getAll: async () => {
      return axios.patch('/orders', {}, {
        baseURL: process.env.REACT_APP_ORDERS_SERVICE,
        headers: getHeaders(),
      });
    },
    create: async () => {
      // Data should come from user. This is for quick demo only
      const result = await axios.post('/orders', {
        customerId: "12456789",
        shippingAddress: "abc",
        billingAddress: "abc",
        totalPrice: 1000
      }, {
        baseURL: process.env.REACT_APP_ORDERS_SERVICE,
        headers: getHeaders(),
      });

      if (result) {
        // Should rerender UI instead of force reload
        window.location.reload();
      }
    }
  };
})();