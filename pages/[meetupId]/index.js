import { MongoClient, ObjectId } from 'mongodb';

import Head from 'next/head';

import { env } from '../api/new-meetup';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const connectionString = `mongodb+srv://${env.mongodb_username}:${env.mongodb_password}@${env.mongodb_clustername}.5mx6g.mongodb.net/${env.mongodb_database}?retryWrites=true&w=majority&appName=Cluster0`;

export default function MeetupDetails(props) {
  //   const router = useRouter();

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
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

  const client = await MongoClient.connect(connectionString);
  //   console.log('client', client);

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
      // {
      //   id: meetupId, // THIS NEEDS IF FALLBACK SET TO TRUE in getStaticPaths
      //   image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
      //   title: 'picture alt here',
      //   address: 'Some address 5 4432',
      //   description: 'Te meetup description',
      // },
      debugData: {},
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

  //   console.log('meetups', meetups);

  client.close();

  return {
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
    //   [
    //     {
    //       params: {
    //         meetupId: '67f39cd8671a4c6753b68640',
    //       },
    //     },
    //     {
    //       params: {
    //         meetupId: '67f39e1ee520df1a880e96e2',
    //       },
    //     },
    //   ],
    // if TRUE: nextjs try to generate pages dynamically
    // if FALSE: contains ALL supported meetup ID values
    fallback: 'blocking',
  };
}
