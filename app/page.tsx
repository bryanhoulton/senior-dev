"use client";

import {
  useEffect,
  useState,
} from 'react';

import { Star } from 'lucide-react';
import Image from 'next/image';

import guy from '../public/guy.webp';

export default function Home() {
  const [starCount, setStarcount] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/bryanhoulton/senior-dev/stargazers")
      .then((res) => res.json())
      .then((data) => {
        setStarcount(data.length);
      });
  }, []);

  return (
    <div className="flex flex-col h-[100vh] items-center justify-center">
      <div className="flex justify-center gap-12 w-100 items-center">
        <Image src={guy} alt="guy" height={300} width={500} />

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">This is senior dev.</h1>
          <p className="text-lg">
            Rude. Pedantic. Unhelpful.
            <br></br>How he gets paid so much is a mystery.
          </p>

          <div className="flex gap-4">
            <a href="https://github.com/apps/silly-senior-dev" target="_blank">
              <button className="border shadow flex items-center px-4 py-2 rounded-lg">
                + Add to GitHub
              </button>
            </a>

            <a
              href="https://github.com/bryanhoulton/senior-dev"
              target="_blank"
            >
              <button className="border shadow flex items-center rounded-lg divide-x text-black">
                <div className="flex px-4 py-2 gap-2 items-center bg-[#F5F8FA] rounded-l-lg">
                  <Star size={18} color="#636D76" />
                  Star
                </div>

                <div className="py-2 px-4">{starCount.toString()}</div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
