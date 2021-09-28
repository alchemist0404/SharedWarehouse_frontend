/* eslint-disable max-len */
import { createRoutine } from 'redux-saga-routines';

const createDashboardRoutine = <T extends unknown>(actionName: string) => createRoutine<T>(`ADMIN_DASHBOARD__DASHBOARD:${actionName}`);

/* PlopJS routine placeholder. Do not remove */
