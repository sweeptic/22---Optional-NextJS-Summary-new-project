import { useRouter } from 'next/router';

import MeetupDetail from '../../components/meetups/MeetupDetail';

export default function MeetupDetails() {
  const router = useRouter();

  console.log('router', router.query.meetupId);

  return (
    <>
      <MeetupDetail
        image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg"
        title="picture alt here"
        address="Some address 5 4432"
        description="Te meetup description"
      />
    </>
  );
}
