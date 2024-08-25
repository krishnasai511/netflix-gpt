import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import Error from "./Error";
// import MainContainer from "./MainContainer";
// import SecondaryContainer from "./SecondaryContainer";
// import GptSearch from "./GptSearch";
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    // { THIS IS ALTERNATIVE TO TOGGLING THE VIEWS BETWEEN SEARCH AND CONTAINERS
    //   path: "/browse",
    //   element: <Browse />,
    //   children: [
    //     {
    //       path: "", //deefault route
    //       element: (
    //         <>
    //           <MainContainer />
    //           <SecondaryContainer />
    //         </>
    //       ),
    //     },
    //     {
    //       path: "search",
    //       element: <GptSearch />,
    //     },
    //   ],
    // },
    {
      path: "/error",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
