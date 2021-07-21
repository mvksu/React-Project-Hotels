export const reducer = (state, action) => {
    switch (action.type) {
      case 'change-theme':
        return {
          ...state,
          theme: state.theme === 'danger' ? 'primary' : 'danger'
        };
      case 'login':
        return { ...state, user: action.user };
      case 'logout':
        return { ...state, user: null };
      default:
        throw console.error("nie ma takiej akcji");
    }
  }

  export const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
    theme: 'danger'
  }

