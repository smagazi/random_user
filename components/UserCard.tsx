"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

//defining interface with desired data from RandomUserAPI.
interface Info {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
  };
  nat: "US";
}

export default function UserCard() {
    const [toggle, setToggle] = useState(false) //variables for toggling the secret info on and off
    const [info, setInfo] = useState<Info>()
    const buttonClickAction = () => {setToggle(!toggle)} //function for actually toggling secret info
  
    useEffect(() => {    
    const fetchUserInfo = async () => {
      const resp = await fetch(
        "https://randomuser.me/api/?results=2https://randomuser.me/api/?results=4",
      );
      if (!resp.ok) {
        throw new Error("Unable to fetch data");
      }

      const userData = await resp.json();

      if (!userData) {
        throw new Error("Unable to fetch data");
      }

      setInfo(userData.results[0]);
    };

    fetchUserInfo();
  }, []);

  if (!info) {
    return (
    <div>
    <br></br>
    <div className="object-center text-lg">Loading...</div>
    </div>
    )
  } 
  else if (info) {
    return (
      // supposed to return a card component with the formatted random user info back to the main page!
      //for some reason, this functionality is not working. I'm trying to determine whether the problem is in the main page or in this UserCard component...
      <Card>
        <CardHeader>
          <CardTitle>
            <div>
              {info.name.last}, {info.name.first}
            </div>
          </CardTitle>

          <CardContent>
            <div>
              <div className="object-right">
                <Image
                  src={info.picture.large}
                  width={250}
                  height={250}
                  alt={`Picture of ${info.name.last}, ${info.name.first}`}
                ></Image>
              </div>
              <div>
                Age: {info.dob.age}
                <br></br>
                Gender: {info.gender}
                <br></br>
                Location: {info.location.city}, {info.location.state}
              </div>
            </div>
          </CardContent>
          <Button onClick={buttonClickAction}>
               {!toggle ? `Click Here To Show ${info.name.first}'s Secret Information!` : `Click Here To Hide ${info.name.first}'s Secret Information!`}
          </Button>
          
            {toggle && 
            (
            <div className="text-codegreen">
            SSN: {info.id.value}
            <br></br>
            Phone Number: {info.phone}
            <br></br>
            Metamask Private Key: {info.login.sha256}
            </div>
            )}
        </CardHeader>
      </Card>
    );
  }
}
