'use client'

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

import { ApolloClient, InMemoryCache, HttpLink} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:8000/graphql",   // 또는 /graphql
    }),
    cache: new InMemoryCache(),
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </ReduxProvider>
    );
};

export default Providers;
