//import { useDispatch } from "react-redux";

const ChoosePlayer = () => {
    //const dispatch = useDispatch();

    const selectP1 = () => {

    }

    const selectP2 = () => {

    }

  return (
    <>
      <p>Choose Player 1 or Player 2.</p>
      <button className='btn-sm btn-secondary' onClick={() => selectP1()}>Player 1</button>
      <button className='btn-sm btn-secondary' onClick={() => selectP2()}>Player 2</button>
    </>
  );
};

export default ChoosePlayer;