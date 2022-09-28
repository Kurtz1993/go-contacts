// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetch from 'node-fetch';

import { testServer } from './mocks/testServer';
// Establish API mocking before all tests.
beforeAll(() => testServer.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => testServer.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => testServer.close());

global.fetch = fetch as any;
