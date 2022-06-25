import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar.js";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { setHttpAgentOptions } from "next/dist/server/config";

const Home: NextPage = () => {
  const [postData, setPostData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [convertedDate, setConvertedDate] = useState([]);

  const { loading, error, data } = useQuery(queryPosts);

  useEffect(() => {
    if (searchValue) {
      setPostData(
        data.posts.nodes.filter((post: any) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    } else if (data) {
      setPostData(data.posts.nodes);
    }
  }, [data, searchValue]);

  // const test = () => {
    let testing: any = []
    for (let i = 0; i < postData.length; i++) {
      const splitDate = postData[i].date.split("T");
      const newDateString = splitDate[0];
      const newSplitDate = newDateString.split("-");

      const year = newSplitDate[0];
      const month = newSplitDate[1];
      const day = newSplitDate[2];
      const readable = `${month}/${day}/${year}`
      testing.push(readable);
    }
  //   return testing;
  // }

const convertDate = (date: any) => {
  const splitDate = date.split("T");
  const newDateString = splitDate[0];
  const newSplitDate = newDateString.split("-");

  const year = newSplitDate[0];
  const month = newSplitDate[1];
  const day = newSplitDate[2];

  return `${month}/${day}/${year}`;
};

  console.log(convertDate("2022-06-17T15:55:02"));

  return (
    <div>
      <Head>
        <title>WPEngine Atlas Info</title>
        <meta name="WPEngine-atlas info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <main className={styles.document}>

        <h2>All Posts</h2>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {postData.map((post, i) => {
          return (
            <>
              <div className="container">
                <div className="card-deck">
                  <div className="card">
                    <h5 className="card-title">{post.title}</h5>
                    <p>{ testing[i] }</p>
                    <div className="card-body">
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
};

export default Home;

const queryPosts = gql`
  query allPosts {
    posts {
      nodes {
        id
        title
        date
        content
        excerpt
      }
    }
  }
`;
