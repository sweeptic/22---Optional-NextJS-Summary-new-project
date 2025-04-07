import { useRouter } from 'next/router';

import { MongoClient, ObjectId } from 'mongodb';

import { env } from '../api/new-meetup';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const connectionString = `mongodb+srv://${env.mongodb_username}:${env.mongodb_password}@${env.mongodb_clustername}.5mx6g.mongodb.net/${env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;

export default function MeetupDetails(props) {
  const router = useRouter();

  //   console.log('Runs on CLIENT meetupId: ', props);

  return (
    <>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticProps(context) {
  // context.params !!! holds the URL

  // need pre generated all te URLs
  // THIS NEEDS IF FALLBACK SET TO TRUE in getStaticPaths

  const meetupId = context.params.meetupId;
  console.log('Runs on SERVER meetupId: ', meetupId);

  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  // const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
  //   const selectedMeetup = await meetupsCollection.findOne({ title: 'title 1' });
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId.createFromHexString(meetupId) });

  //   console.log('selectedMeetup', selectedMeetup);

  client.close();

  //only visible on DEV server

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      //       {
      //     id: meetupId, // THIS NEEDS IF FALLBACK SET TO TRUE in getStaticPaths
      //     image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
      //     title: 'picture alt here',
      //     address: 'Some address 5 4432',
      //     description: 'Te meetup description',
      //   },
    },
  };
}

// when use dynamic pages
// when use getStaticProps
// NextJS need pre generate ALL VERSIONS of this path
export async function getStaticPaths() {
  const client = await MongoClient.connect(connectionString);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
    //       [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
    // if TRUE: nextjs try to generate pages dynamically
    // if FALSE: contains ALL supported meetup ID values
    fallback: true,
  };
}
