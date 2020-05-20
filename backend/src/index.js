import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './api/typeDef';
import { resolvers } from './api/resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()

const startServer = async () => {
    
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();
    server.applyMiddleware({ app });

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch (error) {
        throw error
    }
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: false
    };
    app.use(cors(corsOptions))
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();

