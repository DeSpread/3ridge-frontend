import { useEffect } from "react";
import { useQuery } from "@apollo/client";

export async function getStaticProps() {
  return { props: {} };
}

const Dummy = () => {
  // const { loading, data } = useQuery(GET_ROCKET_INVENTORY);
  return (
    <div>
      {/*<h3>Available Inventory</h3>*/}
      {/*{loading ? (*/}
      {/*  <p>Loading ...</p>*/}
      {/*) : (*/}
      {/*  <table>*/}
      {/*    <thead>*/}
      {/*      <tr>*/}
      {/*        <th>Model</th>*/}
      {/*      </tr>*/}
      {/*    </thead>*/}
      {/*    <tbody>*/}
      {/*      {data &&*/}
      {/*        data.locations.map((location) => {*/}
      {/*          return (*/}
      {/*            <tr key={location.id}>*/}
      {/*              <td>{location.id}</td>*/}
      {/*            </tr>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*)}*/}
    </div>
  );
};

export default Dummy;
