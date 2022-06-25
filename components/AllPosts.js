import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

export default function AllPosts() {
  const { loading, error, data } = useQuery(queryPosts);
  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  const allPosts = data.posts.nodes;

  return (
    <>
      {allPosts.map((post) => {
        return (
          <>
            <div className="container">
            <div className="card-deck">
              <div className="card">
                <h5 className="card-title">{post.title}</h5>
                <div className="card-body">
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </div>  
              </div>
              </div>
              </div>
          </>
        );
      })}
    </>
  );
}

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
