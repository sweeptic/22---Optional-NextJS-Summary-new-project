import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// STATIC GENERATION WHEN BUILD THE SITE
export async function getStaticProps(ctx) {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // ISG: replace old generated pages during the run time
    revalidate: 3600, // / 1 hour
  };
}
