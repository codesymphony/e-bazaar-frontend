import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { RootAction, RootState } from 'typesafe-actions';

import rootReducer from './reducers';
import rootEpic from './epics';

const logger = createLogger({
  duration: true,
  timestamp: true,
  // diff: true,
});

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
  // dependencies: { database },
});

const createStoreWithMiddleware = applyMiddleware(
  epicMiddleware,
  logger,
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

epicMiddleware.run(rootEpic);

export default store;
