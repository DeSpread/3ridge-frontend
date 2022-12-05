import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROCKET_INVENTORY } from "../../apollo/queries";

export async function getStaticProps() {
  return { props: {} };
}

const Dummy = () => {
  const { loading, data } = useQuery(GET_ROCKET_INVENTORY);
  useEffect(() => {}, []);
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
