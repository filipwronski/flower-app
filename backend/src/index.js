import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import { typeDefs } from './api/typeDef';
import { resolvers } from './api/resolvers';
import { photoUpload } from './photo-upload/photoUpload'
import { corsConfig } from './config/corsConfig'
import { connectDatabase } from './database/connectDatabase'

dotenv.config()

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs, resolvers,
        cors: corsConfig
    });
    const app = express();
    server.applyMiddleware({ 
        app, 
        cors: corsConfig,
        path: "/graphql", 
    });

    app.use(cors(corsConfig));  
    app.use(express.static('./public'));
    app.post('/upload-image', photoUpload.any('file'), (req, res) => {
        try {
            res.send(req.file);
        } catch(err) {
            res.send(400);
        }
    });
    
    await connectDatabase()
    
    https.createServer({
        key: fs.readFileSync(__dirname + '/server.key'),
        cert: fs.readFileSync(__dirname + '/server.cert')
    }, app).listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at https://localhost:4000${server.graphqlPath}`)
    );
}

startServer();

