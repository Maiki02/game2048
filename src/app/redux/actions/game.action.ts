import { createAction, props } from "@ngrx/store";

//RememberDashboard
export const rememberDashboardData = createAction('[GAME] Remember Data',
    props<{ state: any }>());

//Orders
export const loadOrders = createAction('[DASHBOARD] Load Orders',
    props<{ email: String, status: number }>());
export const loadAllOrdersSuccess = createAction('[DASHBOARD] Load Orders All Success',
    props<{ orderList: any }>());