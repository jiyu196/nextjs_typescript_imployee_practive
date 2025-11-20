import {configureStore} from "@reduxjs/toolkit";
import employeeList from "@/components/EmployeeList";
import emp from "@/redux/employeeSlice";


export const store = configureStore({
    reducer: {
        emp,
    }
});

export type RootState = ReturnType<typeof store.getState>; // state
export type RootDispatch = typeof store.dispatch; // action 잡는거