import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../layouts/Layout";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Layout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme={"dark"}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="bg-primary-dark min-h-screen font-poppins text-text-dark  ">
            <div className=" flex justify-between lg:gap-4  lg:px-10 relative">
              <div className="w-fit h-full  m-4 d-none d-lg-block  ">
                <Header />
              </div>

              <div className="flex-1 p-4 my-4 overflow-hidden ml-lg-3 ">
                <div>
                  <SearchInput />
                </div>
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
