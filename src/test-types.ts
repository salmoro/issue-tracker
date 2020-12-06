/**
 * Needed to override Jasmine's globally declared 'expect'.
 * We still need Jasmine and its types installed for the e2e tests.
 */
declare const expect: jest.Expect;
