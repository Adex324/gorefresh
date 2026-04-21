import React, { useEffect } from 'react';
import loading_pic from '../assets/loading_pic.svg';
import background from '../assets/background.svg';


const Loading = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // tell the parent we're done
    }, 3000); // however long your animation runs

    return () => clearTimeout(timer);
  }, []);
  return (
    <section  className="relative w-full min-h-screen font-geist flex flex-col bg-cover bg-center bg-no-repeat items-center justify-center"
                style={{ backgroundImage: `url(${background})` }}>
     <img src={loading_pic} alt="Loading" />
    </section>
  )
}

export default Loading
