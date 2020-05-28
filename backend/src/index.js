import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './api/typeDef';
import { resolvers } from './api/resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})
const upload = multer({ storage: storage })
dotenv.config()

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs, resolvers,
        cors: {
            credentials: true,
            origin: (origin, callback) => {
            const whitelist = [
                "https://192.168.0.73:3000",
                "http://192.168.0.73:3000"
            ];

            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        }
        } 
    });
    const app = express();
    server.applyMiddleware({ app, cors: {
        credentials: true,
        origin: true
      },
    path: "/graphql", });

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'https://192.168.0.73:3000');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

    app.post('/upload-image', upload.any('file', cors()), (req, res) => {
        console.log('test')
        try {
            res.send(req.file);
        }catch(err) {
            res.send(400);
        }
    });
    

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch (error) {
        throw error
    }
    https.createServer({
        key: fs.readFileSync(__dirname + '/server.key'),
        cert: fs.readFileSync(__dirname + '/server.cert')
    }, app).listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at https://localhost:4000${server.graphqlPath}`)
    );
}

startServer();

