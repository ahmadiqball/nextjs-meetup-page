import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const MeetupForm = () => {
  const router = useRouter();

  const addMeetuphandler = async (newData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Create your own meetup and create amazing network."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetuphandler}></NewMeetupForm>
    </Fragment>
  );
};

export default MeetupForm;
