import { Line, Order } from '../types'
import { ActiveOrderState } from './active-order-context'

export type ActiveOrderAction =
  | { type: 'SET_ACTIVE_ORDER'; payload: Order | null }
  | { type: 'ADJUST_ORDER_LINE'; payload: Line }
  | { type: 'REMOVE_ORDER_LINE'; payload: number } // payload is line id
  | { type: 'UPDATE_ORDER_LINE'; payload: Line }
  | { type: 'SET_ERROR'; payload: Error }

export const ActiveOrderReducer = (
  state: ActiveOrderState,
  action: ActiveOrderAction
): ActiveOrderState => {
  switch (action.type) {
    case 'SET_ACTIVE_ORDER': {
      return {
        ...state,
        activeOrder: action.payload,
      }
    }
    case 'ADJUST_ORDER_LINE': {
      return {
        ...state,
        activeOrder: state.activeOrder
          ? {
              ...state.activeOrder,
              lines: [action.payload, ...state?.activeOrder?.lines],
            }
          : null,
      }
    }
    case 'UPDATE_ORDER_LINE': {
      return {
        ...state,
        activeOrder: state.activeOrder
          ? {
              ...state.activeOrder,
              lines: state?.activeOrder?.lines?.map((line) =>
                action.payload.id === line.id ? action.payload : line
              ),
            }
          : null,
      }
    }
    case 'REMOVE_ORDER_LINE': {
      return {
        ...state,
        activeOrder: state.activeOrder
          ? {
              ...state.activeOrder,
              lines: state?.activeOrder?.lines?.filter(
                (line) => line.id !== action.payload
              ),
            }
          : null,
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
