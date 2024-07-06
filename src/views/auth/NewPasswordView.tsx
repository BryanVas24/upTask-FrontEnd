import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfrimToken } from "@/types/index";

const NewPasswordView = () => {
  const [token, setToken] = useState<ConfrimToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablecer password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          setIsValidToken={setIsValidToken}
          setToken={setToken}
          token={token}
        />
      ) : (
        <NewPasswordForm />
      )}
    </>
  );
};

export default NewPasswordView;
