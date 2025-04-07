// /api/new-meetup

import { MongoClient } from 'mongodb';

const env = {
  mongodb_username: 'sweepticmac',
  mongodb_password: 'FvdCuyPuZSrXhAh5',
  mongodb_clustername: 'cluster0',
  mongodb_database: 'restApi-demo',
};

const connectionString = `mongodb+srv://${env.mongodb_username}:${env.mongodb_password}@${env.mongodb_clustername}.5mx6g.mongodb.net/${env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;

export default async function POST(req, res) {
  const data = req.body;
  //   const { title, image, address, description } = data;

  const client = await MongoClient.connect(connectionString);

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const result = await meetupsCollection.insertOne(data);

  console.log(result);

  // error handling...
  client.close();

  res.status(201).json({ message: 'Meetup inserted!' });
}
