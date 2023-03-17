import { atom, selector } from "recoil";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const cookies = parseCookies();
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = cookies[key];
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? destroyCookie(null, key)
        : setCookie(null, key, JSON.stringify(newValue));
    });
  };

const nameState = atom({
  key: "nameState",
  default: "",
  effects: [localStorageEffect("current_name")],
});

const charState = selector({
  key: "charState",
  get: ({ get }) => {
    const name = get(nameState);
    return name.length;
  },
});

export { nameState, charState };
