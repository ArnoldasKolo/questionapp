import Header from "../Components/Header/Header";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import search from "../Images/search.png";
import QuestionCard from "../Components/Question/QuestionCard";

interface Question {
  id: string;
  question: string;
  description: string;
  answers:Array<string>;
}

interface ApiResponse {
  questions: Question[];
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [answerNum, setAnswerNum] = useState<string>("");

  function scrollToSection(): void {
    const section: HTMLElement | null = document.getElementById('section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const fetchAllPosts = async () => {
    const response = await axios.get<ApiResponse>("http://localhost:8081/questions");
    
    const { data } = response;
    console.log(data.questions);
    setQuestions(data.questions);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const filteredPosts = questions.filter((question) =>
  question.question.toLowerCase().includes(filter.toLowerCase()) &&
  (answerNum === "" || 
    (answerNum === "Answered" && question.answers.length > 0) ||
    (answerNum === "Not Answered" && question.answers.length === 0))
);

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.section1}>
          <div className={styles.heroText}>
            <p>Discover Games and solutions in one place</p>
            <h1>Find answers to your game problems</h1>
            <button onClick={scrollToSection}>Start exploring</button>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.section2} id="section">
          <h3 className={styles.section2Header}>All Questions</h3>
          <div className={styles.searchWrapper}>
            <Image className={styles.searchImage} src={search} alt="search" />
            <input
              type="text"
              placeholder="Search"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.selectWrapper}>
            <select
              id="platform"
              onChange={(event) => setAnswerNum(event.target.value)}
              className={styles.formSelect}
            >
              <option value="">All</option>
              <option value="Answered">Answered</option>
              <option value="Not Answered">Not Answered</option>
            </select>
          </div>
        </div>
        <div className={styles.section3}>
          <div className={styles.cardsWrapper}>
            {filteredPosts.map((post) => (
              <div key={post.id}>
                <QuestionCard
                  id={post.id}
                  question={post.question}
                  description={post.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
