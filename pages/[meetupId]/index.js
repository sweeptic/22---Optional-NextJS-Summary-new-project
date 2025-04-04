import { useRouter } from 'next/router';

import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails(props) {
  const router = useRouter();

  console.log('router', router.query.meetupId);

  return (
    <>
      <MeetupDetail {...props.meetupData} />
    </>
  );
}

export async function getStaticProps(ctx) {
  // context.params !!! holds the URL

  const meetupId = context.params.meetupId;
  console.log('meetupId', meetupId);

  return {
    props: {
      meetupData: {
        // id: m1,
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        title: 'picture alt here',
        address: 'Some address 5 4432',
        description: 'Te meetup description',
      },
    },
  };
}
