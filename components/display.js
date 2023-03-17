import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nameState, charState } from "./states";

const Display = () => {
  const charName = useRecoilValue(charState);
  const [name, setName] = useRecoilState(nameState);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <div>
          <p>My name is {name}</p>
          <p>My name has {charName} characters</p>
        </div>
      )}
    </>
  );
};

export default Display;
