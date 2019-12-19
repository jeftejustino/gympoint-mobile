export function reloadHelpOrders(reload) {
  return {
    type: '@user/RELOAD_HELP_ORDERS',
    payload: {
      reload,
    },
  };
}
