import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../layouts/Layout";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <div className="bg-primary-dark min-h-screen font-poppins text-text-dark  ">
          <div className=" flex justify-between gap-4  px-10 relative">
            <div className="w-fit h-full  m-4">
              <Header />
            </div>

            <div className="flex-1 p-4 my-4 ml-20 overflow-hidden">
              <div>
                <SearchInput />
              </div>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
