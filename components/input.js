import { useRecoilState } from "recoil";
import { nameState } from "./states";

const Input = () => {
  const [name, setName] = useRecoilState(nameState);

  return (
    <div>
      <p>Enter your name:</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default Input;
