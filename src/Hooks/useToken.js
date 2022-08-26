import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState(" ");
  useEffect(() => {
    if (user) {
      const email = user?.user?.email;
      const currentUser = { email: email };
      fetch(`https://floating-earth-43239.herokuapp.com/user/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
          console.log(data.token);
        });
    }
  }, [user]);

  return [token];
};
export default useToken;
