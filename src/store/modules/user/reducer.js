import produce from 'immer';

const INITIAL_STATE = {
  profile: {},
  reloadHelpOrders: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = false;
        break;
      }

      case '@user/RELOAD_HELP_ORDERS': {
        draft.reloadHelpOrders = action.payload.reload;
        break;
      }

      default:
    }
  });
}
