import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head"
import MeetupList from "../components/meetups/MeetupList";

const Homepage = (props) => {
  return (
      <Fragment>
        <Head>
          <title>React Meetups</title>
          <meta name='description' content="Browse a huge list of active meetups places."/>
        </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
      </Fragment>
  );
};

export default Homepage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://ahmiqbal1412:wZIOnreAdDVr0d41@cluster0.ugjct46.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}
