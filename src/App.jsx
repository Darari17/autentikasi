import router from "./routers/router";

import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router}/>
    </NextUIProvider>
  )
}

export default App