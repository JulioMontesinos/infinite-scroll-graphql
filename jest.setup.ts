import "@testing-library/jest-dom";

class IntersectionObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
}

global.IntersectionObserver = IntersectionObserverMock as any;

export {};