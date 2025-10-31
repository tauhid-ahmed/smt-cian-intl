import React from "react";
import { Twitter } from "lucide-react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { Heading } from "@/components/Heading";
import Link from "next/link";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  twitter?: string;
  podcast?: string;
}

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="flex flex-col items-center bg-zinc-800 rounded-full w-fit px-2 pt-2 pb-6">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <h3 className="text-xl font-semibold text-white mb-1 text-center">
        {member.name}
      </h3>

      <p className="text-gray-400 text-sm sm:text-base mb-3 text-center">
        {member.role}
      </p>

      <div className="flex gap-3">
        {member.twitter && (
          <Link
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 transition-colors"
            aria-label={`${member.name}'s Twitter`}
          >
            <Twitter className="w-5 h-5" />
          </Link>
        )}
        {member.podcast && (
          <a
            href={member.podcast}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 transition-colors"
            aria-label={`${member.name}'s Podcast`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

const MeetTheTeam: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      twitter: "#",
      podcast: "#",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Head of A&R",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      twitter: "#",
      podcast: "#",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Music Producer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      twitter: "#",
      podcast: "#",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      twitter: "#",
      podcast: "#",
    },
  ];

  return (
    <Section className="bg-accent">
      <Container className="space-y-10">
        <Heading as="h2" size="h3" align="center">
          Meet The Team
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-8 max-w-5xl w-full mx-auto">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default MeetTheTeam;
