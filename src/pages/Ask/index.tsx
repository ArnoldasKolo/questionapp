import Header from "@/Components/Header/Header";
import React, { useState } from "react";
import styles from "./style.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

interface Question {
  question: string;
  description: string;

}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [question, setQuestions] = useState("");
  const [description, setDescription] = useState("");
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");

  const createGame = async () => {

    try {
      const response = await axios.post<Question>(
        "http://localhost:8081/question",
        {
          question: question,
          description:description
        },
        {
          headers: {
            authorization:  Cookies.get('Token'),
          },
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        router.push("/");
      }
      
    } catch (err:any) {
      // if (response.status === 401) {
      //   router.push("/login");
      // }
      console.log(err)
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
            <h3 className={styles.registerHeader}>Ask a Question</h3>
            {inputFail ? <p className={styles.inputFail}>{badData}</p> : ""}
            <div className={styles.form}>
              <input
                className={styles.input}
                type="text"
                placeholder="Question"
                value={question}
                onChange={(event) => setQuestions(event.target.value)}
              />
              <textarea
                placeholder="Description"
                className={styles.input}
                cols={30}
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
              <button onClick={createGame} className={styles.button}>
                Submit
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
