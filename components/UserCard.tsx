"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";

//defining interface with desired data from RandomUserAPI. 
interface Info {
    "gender": string,
    "name": {
    "title": string,
    "first": string,
    "last": string
    },
    "location": {
    "street": {
        "number": number,
        "name": string,
    },
    "city": string,
    "state": string,
    "country": string,
    "postcode": string,
    "coordinates": {
        "latitude": string,
        "longitude": string
    },
    },
    "email": string,
    "login": {
    "uuid": string,
    "username": string,
    "password": string,
    "salt": string,
    "md5": string,
    "sha1": string,
    "sha256": string
    },
    "dob": {
    "date": string,
    "age": number
    },
    "phone": string,
    "id": {
    "name": string,
    "value": string
    },
    "picture": {
    "large": string
    },
    "nat": "US"
}

export default function UserCard() {
    const [toggleInfo, setToggleInfo] = useState(false)
    const [info, setInfo] = useState<Info>();


    useEffect(() => {
        const fetchUserInfo = async () => {
            const resp = await fetch("https://randomprofileapi.com/api/?results=2")
            const userData = await resp.json()

            if (!userData) {
                throw new Error("Failed to fetch data")
            }

            setInfo(userData.results[0])
        }

        fetchUserInfo()
    }, [])

    if (info)
        return (
            <Card> 
                <CardHeader>
                    <CardTitle>
                        <div>
                        {info.name.last}, {info.name.first}
                        </div>
                    </CardTitle>

                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            Age: {info.dob.age}
                            Gender: {info.gender}
                            Location: {info.location.city}, {info.location.state}
                            </div>
                            <div>
                                <Image src= {info.picture.large}
                                    width= {250}
                                    height= {250}
                                    alt= "Picture of {info.name.last}, {info.name.first}">
                                </Image>
                            </div>
                        </div>
                    </CardContent>
                    <Button asChild>
  <Link href="/secret-user-data">Click Here For {info.name.first}&apos;s Secret Information! </Link>
</Button>
                </CardHeader>
            </Card>
            )
}