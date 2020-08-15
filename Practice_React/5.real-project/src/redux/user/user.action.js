import {UserActionType} from './user.type';

export const setCurrentUser = user => ({ //return an action object
    type: UserActionType.SET_CURRENT_USER,
    payload: user
})