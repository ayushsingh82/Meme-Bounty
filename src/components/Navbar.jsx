import React from 'react'


const initSignin = async () => {
  // setLoading(true);
  try {
    // const signature: String = await signMessage(address+":loggin_in_to_session");
    if (window.tronLink === undefined) {
      console.log("TronLink not found");
      return;
    }
    if (!window.tronLink.ready) {
      window.tronLink.request({ method: "tron_requestAccounts" });
      return;
    }
    // const message =
    //   window.tronLink.tronWeb.defaultAddress?.base58 +
    //   ":logging_in_to_session";
    // const signature = await window.tronLink.tronWeb.trx.signMessageV2(
    //   message
    // );
    // console.log("signature:", signature);
    // const res = await signIn("tronAuth", {
    //   message,
    //   signature,
    //   redirect: false
    // });
    // console.log("signInres:", res);

    // if (res?.ok) {
    //   // router.push("/app");
    // } else {
    //   console.error("Sign in failed");
    // }
  } catch (error) {
    console.error("Error while signing in:", error);
  } finally {
    setLoading(false);
  }
};

function Navbar() {
    return (
      <nav className=''>
        <div className='flex flex-row mx-auto px-[40px] py-[25px] justify-between items-center mt-[0px] bg-black'>
          <div className='font-bold text-2xl text-red-700'>
            <a href='/'>Tron-Art</a>
          </div>
          <div className='flex justify-center flex-1 space-x-8 text-center'>
            <h1 className='font-medium text-xl text-white'>
              <a href='/form'>Dashboard</a>
            </h1>
            <h1 className='font-medium text-xl text-white'>
              <a href='/'>Bounties</a>
            </h1>
          </div>
          <div className='text-white'>
          <button onClick={initSignin}>Connect</button>
          </div>
        </div>
        <hr className='border-t-2 border-red-700' />
      </nav>
    );
  }
  

export default Navbar