import { atom, selector } from "recoil";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const cookies = parseCookies();
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = cookies[key];
    console.log(savedValue);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? destroyCookie(null, key)
        : setCookie(null, key, JSON.stringify(newValue), {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
          });
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
