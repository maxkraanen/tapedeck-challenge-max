import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FlattenedTapes } from "@/types";

interface Props {
  data: FlattenedTapes;
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <div>
      {Object.values(data).map((tape, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            border: "1px solid #e0e0e0",
            padding: "15px",
          }}
        >
          <Link href={tape.page || "#"}>
            {tape.thumb && (
              <Image
                src={tape.thumb}
                alt={tape.brand || "Tape"}
                width={150} // you can adjust these as per your needs
                height={150}
              />
            )}
          </Link>
          <div>Color: {tape.color}</div>
          <div>Brand: {tape.brand}</div>
          <div>Type: {tape.type}</div>
          <div>Playing Time: {tape.playingTime}</div>
        </div>
      ))}
    </div>
  );
};
