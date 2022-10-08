import { Action, createReducer, on } from "@ngrx/store";
import * as actions from '../actions/game.action';

export const initialState: any = {
    ordersList: {
        returned: [],
        pending: [],
        confirmed: []
    }

};

const _gameReducer = createReducer(
    initialState,
    on(actions.rememberDashboardData, (state, action) => {
        return action.state;
    }),

    //Orders
    on(actions.loadAllOrdersSuccess, (state, action) => {
        return {
            ...state,
            ordersList: action.orderList
        };
    }),
   
)


export function gameReducer(state: any, action: Action) {
    return _gameReducer(state, action);
}

