
// Legacy utilities - cleanup applied
// This file previously contained Array.prototype monkey-patching which has been removed
// as it was causing routing and Redux issues by randomly returning null from filter()

export const legacyInit = () => {
  console.log("Legacy System Initialized...");
};
