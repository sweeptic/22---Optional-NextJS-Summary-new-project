import { useRouter } from 'next/router';

import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails(props) {
  const router = useRouter();

  console.log('Runs on CLIENT meetupId: ', props.meetupData?.id);

  return (
    <>
      <MeetupDetail {...props.meetupData} />
    </>
  );
}

export async function getStaticProps(context) {
  // context.params !!! holds the URL

  // need pre generated all te URLs
  // THIS NEEDS IF FALLBACK SET TO TRUE in getStaticPaths
  const meetupId = context.params.meetupId;

  //only visible on DEV server
  console.log('Runs on SERVER meetupId: ', meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId, // THIS NEEDS IF FALLBACK SET TO TRUE in getStaticPaths
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        title: 'picture alt here',
        address: 'Some address 5 4432',
        description: 'Te meetup description',
      },
    },
  };
}

// when use dynamic pages
// when use getStaticProps
// NextJS need pre generate ALL VERSIONS of this path
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
    // if TRUE: nextjs try to generate pages dynamically
    // if FALSE: contains ALL supported meetup ID values
    fallback: true,
  };
}
