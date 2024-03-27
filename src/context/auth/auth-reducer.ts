import { AuthState } from './auth-context'

export type AuthAction =
  | { type: 'SET_USER'; payload: ActiveUser | null | undefined }
  | { type: 'LOGOUT' }
  | { type: 'LOADING' }
  | { type: 'LOADED' }
  | { type: 'SET_ERROR'; payload: Error }

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
      }
    }
    case 'LOADING': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'LOADED': {
      return {
        ...state,
        loading: false,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    default:
      return state
  }
}
