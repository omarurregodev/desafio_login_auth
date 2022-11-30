import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar.jsx";

export const Home = () => {

  const [username, setUsername] = useState();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:8000/api/user",
          {
            withCredentials: true
          }
        );
        console.log("respuesta", response.name.user);
        setUsername(response.name.user);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <div>
      {loading ? (
        <>Loading...</>
        ) : (
          <>
          <Navbar data={{name: username}}></Navbar>
          
        </>
      )}
    </div>
  );
};
