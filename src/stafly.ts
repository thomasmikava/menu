import type { AnyStafly } from 'stafly';
import { staflyFactory } from 'stafly';

export const createStorageStore = staflyFactory({
  onAfterCreation: (stafly, options: { storageKey?: string; storageValueValidator?: (data: unknown) => boolean }) => {
    // we can receive custom options when stafly store will be created. Let's receive `storageKey` (you can name it anything) and make it optional
    if (options.storageKey) persistState(stafly, options.storageKey, options.storageValueValidator);
    // you can have other side effects too
  },
});

const persistState = (stafly: AnyStafly, key: string, validator?: (data: unknown) => boolean) => {
  const rawValue = localStorage.getItem(key); // get value from storage
  if (rawValue !== null) {
    try {
      const value = JSON.parse(rawValue);
      if (!validator || validator(value)) stafly.globally.setValue(value); // update stafly store global value
    } catch (e) {
      //
    }
  }
  stafly.globally.subscribeToValueChange((changedValue) => {
    localStorage.setItem(key, JSON.stringify(changedValue)); // update value in storage
  });
};
