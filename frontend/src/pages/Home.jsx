import React from "react";
import FeatureCard from "../components/FeatureCard";
import {features} from '../assets/features'
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#EEF2FF] overflow-hidden pt-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-[#4F39F6] font-semibold text-lg mb-5">Manage Your Tasks with Ease</h1>
          <p className="text-[#717182] mb-8">
            Stay organized, boost productivity, and accomplish more with our
            intuitive task management system. Perfect for individuals and teams.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="text-white bg-black px-6 py-2 rounded-lg cursor-pointer">
              Start Free Today
            </button>
            <button className="bg-white px-6 py-2 rounded-lg cursor-pointer hover:bg-[#717182]/10 transition-all duration-300">Sign In</button>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-5">
        <p className="text-[#4F39F6] font-semibold text-lg">Everything You Need to Stay Productive</p>
        <p className="text-[#717182]">Powerful features designed to help you manage tasks efficiently and collaborate seamlessly.</p>
        <div className="grid grid-cols-3 mt-5 gap-10">
            {
                features.map((feature)=>(
                    <FeatureCard id={feature.id} title={feature.title} description={feature.description}></FeatureCard>
                ))
            }
        </div>
      </section>

      <section className="mt-15 flex flex-col justify-center items-center mb-20">
            <div className="bg-linear-to-r  from-[#5638F7] to-[#9318F9] w-[75%] rounded-2xl flex flex-col items-center ">
                <p className="mt-10 text-white text-xl">Ready to Get Started?</p>
                <p className="p-5 text-center w-[50%] text-white/90">Join thousands of users who are already managing their tasks more efficiently. Sign up now and experience the difference.</p>
                <button className="px-5 py-2 mb-10 text-black bg-white rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={()=>navigate("/signup")}
                >Create Your Free Account</button>
            </div>
      </section>

    </div>
  );
};

export default Home;
