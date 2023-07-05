import Header from "@/Components/Header/Header";
import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");

  const createUser = async () => {
    try{
      const response = await axios.post("http://localhost:8081/logIn", {
      email: email,
      password: password,
    });
    console.log("response", response);
    Cookies.set('Token', response.data.token)

    if (response.status === 200) {
      router.push("/");
    }
    }catch(err:any){
      setBadData(err.response.data.response)
      console.log(badData)
      if(err){
        setInputFail(true)
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div>
          <div className={styles.section1}>
            <h3 className={styles.registerHeader}>Log In</h3>
            <div className={styles.form}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button onClick={createUser} className={styles.button}>Submit</button>
              {inputFail ? <p className={styles.inputFail}>{badData}</p> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;