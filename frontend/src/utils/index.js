import { applyMiddleware, createStore } from 'redux';
import { middlewares, rootReducer } from '../store/createStore';
import checkPropTypes from 'check-prop-types';

/**
 *  Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} component - Enzyme shallow wrapper to search within.
 * @param {String} attr - Value of the data-test attribute to search
 * @returns {ShallowWrapper}
 */

export const findTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

/**
 *  Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer
 * @param {object} initialState  - Initial state for store.
 * @function testStore
 * @returns {Store} - Redux store.
 */
export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const IsValidJSONString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};
