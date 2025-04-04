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

// -----------------------------------------------------------------------------------------
// ONLY RUNS ON THE SERVER!!!!
// -----------------------------------------------------------------------------------------
// It runs after build process
// runs on every incoming requests
// disadvantage : wait for generated every incoming requests
// use this if really need access to request object
// or the underlying data changes every second
// export async function getServerSideProps(context) {
//   // only access in getServerSideProps
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// -----------------------------------------------------------------------------------------

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
