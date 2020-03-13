import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, setUser } from './auth.actions';
 
export const initialState = {   email: '',
                                number: 0
                            };
 
const _authReducer = createReducer(initialState,
  on(increment, state => ({...state,number: state.number+1})),
  on(decrement, state => ({...state,number: state.number-1})),
  on(setUser, (state, {email}) => ({...state,email: email}))
);

export function authReducer(state, action) {
    return _authReducer(state, action);
  }