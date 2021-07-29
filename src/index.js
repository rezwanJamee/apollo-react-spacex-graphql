import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const apolloclient = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const Query = gql`
{
  launchesPast(limit: 10) {
    id
    mission_name
    rocket {
      rocket_name
    }
    launch_date_utc
  }
}
`;

function App() {
  return (
    <div>
      <h2>Apollo Client + SpaceX API</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ApolloProvider client={apolloclient}>
    <App />
    <APIData/>
  </ApolloProvider>,
  rootElement
);


function APIData(){
  const { loading, error, data }= useQuery(Query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <p>First 10 data.</p>
      <ul>
        {data.launchesPast.map((l) => (
          <li key={l.id}> 
            Mission name: {l.mission_name}
            <br/>
            Rocket model: {l.rocket.rocket_name}
            <br/>
            Time: {l.launch_date_utc}
           </li>
        ))}
      </ul>
    </div>
  );
}

