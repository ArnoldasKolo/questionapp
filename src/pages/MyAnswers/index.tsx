// import Header from "../../Components/Header/Header";
// import styles from "./styles.module.css";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import search from "../../Images/search.png";
// import QuestionCard from "../../Components/Question/QuestionCard";
// import Cookies from "js-cookie";
// import router, { useRouter } from "next/router";

// interface Question {
//   id: string;
//   question: string;
//   description: string;
// }

// interface ApiResponse {
//   questions: Question[];
// }

// export default function Home() {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [filter, setFilter] = useState<string>("");
//   const [success, setSuccess] = useState(false);
//   const router = useRouter();


//   const fetchAllUsersPosts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/AllUsersQuestions",
//         {
//           headers: {
//             authorization:  Cookies.get('Token'),
//           },
//         }
//       );

//       console.log(response)
//       const {data}= response
//       setQuestions(data.user[0].createdQuestions)
//     } catch (error) {
//       console.error("Error fetching user posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsersPosts();
//   }, []);

//   const filteredPosts = questions.filter((question) =>
//     question.question.toLowerCase().includes(filter.toLowerCase())
//   );

//   const deleteQuestion = async (postId: string) => {
//     const response = await axios.delete(
//       `http://localhost:8081/deleteQuestion/${postId}`
//     );
//     console.log(response)
//     if (response.status === 200) {
//       setSuccess(true);
//       setTimeout(() => {
//         // setSuccess(false);
//         router.push("/");
//       }, 1000);
//     }
    
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <Header />
//         <div className={styles.section2} id="section">
//           <h3 className={styles.section2Header}>All Questions</h3>
          
//           <div className={styles.searchWrapper}>
//             <Image className={styles.searchImage} src={search} alt="search" />
//             <input
//               type="text"
//               placeholder="Search"
//               value={filter}
//               onChange={(event) => setFilter(event.target.value)}
//               className={styles.searchInput}
//             />
//           </div>
//         </div>
//         <div className={styles.section3}>
//         {success && (
//                 <div className={styles.deleteText}>Post was deleted</div>
//               )}
//           <div className={styles.cardsWrapper}>
          
//             {filteredPosts.map((post) => (
//               <div key={post.id}>
//                 <QuestionCard
//                   id={post.id}
//                   question={post.question}
//                   description={post.description}
//                 />
                
//                 <button onClick={() => deleteQuestion(post.id)} className={styles.delete}>DELETE</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
