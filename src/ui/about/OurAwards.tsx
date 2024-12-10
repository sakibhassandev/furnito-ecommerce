"use client";

import { motion } from "framer-motion";
import { Award, Star, ThumbsUp, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/about/AwardCard";

const awards = [
  {
    icon: <Star className="h-10 w-10" />,
    title: "Best in Class",
    description: "Recognized for exceptional quality and design",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: <ThumbsUp className="h-10 w-10" />,
    title: "Customer Favorite",
    description: "Highest customer satisfaction ratings",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: "Trendsetter",
    description: "Leading the way in furniture innovation",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Sustainability Champion",
    description: "Committed to eco-friendly practices",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

export default function OurAwards() {
  return (
    <section className="pb-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 text-gray-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Awards
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <motion.div
                    className={`w-16 h-16 rounded-full ${award.bgColor} flex items-center justify-center mb-4 mx-auto`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className={award.color}>{award.icon}</span>
                  </motion.div>
                  <CardTitle className="text-xl text-center mb-2">
                    {award.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {award.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
