import React from "react";
import FeatureCard from "../components/FeatureCard";
import {features} from '../assets/features'

const Home = () => {
  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-indigo-600 mb-6">Manage Your Tasks with Ease</h1>
          <p className="text-[#717182] mb-8">
            Stay organized, boost productivity, and accomplish more with our
            intuitive task management system. Perfect for individuals and teams.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="text-white bg-black px-6 py-2 rounded-lg cursor-pointer">
              Start Free Today
            </button>
            <button className="bg-white px-6 py-2 rounded-lg">Sign In</button>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-5">
        <p>Everything You Need to Stay Productive</p>
        <p>Powerful features designed to help you manage tasks efficiently and collaborate seamlessly.</p>
        <div className="grid grid-cols-3 mt-5 gap-10">
            {
                features.map((feature)=>(
                    <FeatureCard id={feature.id} title={feature.title} description={feature.description}></FeatureCard>
                ))
            }
        </div>
      </section>

    </div>
  );
};

export default Home;
