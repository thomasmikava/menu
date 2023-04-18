import type { AnyStafly } from 'stafly';
import { staflyFactory } from 'stafly';

export const createStorageStore = staflyFactory({
  onAfterCreation: (stafly, options: { storageKey?: string }) => {
    // we can receive custom options when stafly store will be created. Let's receive `storageKey` (you can name it anything) and make it optional
    if (options.storageKey) persistState(stafly, options.storageKey);
    // you can have other side effects too
  },
});

const persistState = (stafly: AnyStafly, key: string) => {
  const rawValue = localStorage.getItem(key); // get value from storage
  if (rawValue !== null) {
    try {
      const value = JSON.parse(rawValue);
      stafly.globally.setValue(value); // update stafly store global value
    } catch (e) {
      //
    }
  }
  stafly.globally.subscribeToValueChange((changedValue) => {
    localStorage.setItem(key, JSON.stringify(changedValue)); // update value in storage
  });
};
