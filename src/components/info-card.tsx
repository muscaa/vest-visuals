"use client";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Video,
    CircleCheckBig,
} from "lucide-react";
import { Button } from "./ui/button";

interface Props {
}

export function InfoCard(props: Props) {
    return (
        <Card className="p-10 w-sm shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ring-transparent">
            <CardContent className="flex flex-col justify-center items-center p-0">
                <Video className="text-primary size-16 mb-2" />
                <h3 className="mb-6 text-primary font-bold">VIDEOGRAFIE 4K</h3>
                <div className="flex items-end w-full my-4">
                    <h1>700</h1>
                    <h2 className="font-light">€</h2>
                </div>
                <div className="flex flex-col gap-4 w-full my-6 font-light">
                    {
                        [
                            "fdgsnj sodfgj sondgf osdfj oksd lkjalk gjalkg jlk",
                            "sdfg ojasg jsdfojh sdiogfj okjg oks klgj klsj klk slkdfgj",
                            "dgfh ojoag oapofg ois jpgs jpoj gofpids jgspo s",
                            "dfghjiojsdf opskdgfpo",
                            "dfghogkjsdpo hksd kopihgj pk phosk pok",
                            "fsdgjjh joidsfk opsdgfk p",
                        ].map((value, index) => (
                            <div key={index}>
                                <CircleCheckBig className="text-primary float-left mr-2" />
                                <p>{value}</p>
                            </div>
                        ))
                    }
                </div>
                <Button variant="default" size="xl" className="mt-6 w-full">
                    Rezerva Videograful
                </Button>
            </CardContent>
        </Card>
    );
}
