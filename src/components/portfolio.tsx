'use client';

import PrintLayout from '@/layout/print-layout';
import { c } from '@/shared/constant';
import {
  Calendar,
  ExternalLink,
  Languages,
  Linkedin,
  MapPin,
  Phone,
} from 'lucide-react';

interface IProps {
  readonly showOtherDetails?: boolean;
}

export default function Portfolio(props: IProps) {
  const { showOtherDetails } = props;

  function calculateAge() {
    const today = new Date();
    const birth = new Date('1996-06-24');

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  return (
    <div className="flex-center flex-col">
      <PrintLayout>
        <div className="flex-center mb-2 flex-col">
          <h1 className="mb-2 text-2xl font-bold capitalize">{c.name}</h1>
          <p className="mb-2 text-sm">{c.title}</p>
          <div className="flex-center w-full gap-4 text-sm">
            <div className="flex-center gap-2">
              <Phone size={15} />
              <p>{c.contact.phone.kh}</p>
            </div>

            <div className="flex-center gap-2">
              <MapPin size={15} />
              <p>{c.contact.country.kh}</p>
            </div>

            <div className="flex-center gap-2">
              <Linkedin size={15} />
              <p>{c.contact.linkedin}</p>
            </div>
          </div>

          {showOtherDetails && (
            <div className="flex-center w-full gap-4 text-sm">
              <div className="flex-center gap-2">
                <Languages size={15} />
                <p>{c.Languages}</p>
              </div>
              <div className="flex-center gap-2">
                <Calendar size={15} />
                <p>{calculateAge()} years old</p>
              </div>
            </div>
          )}
        </div>
        <h2>WORK EXPERIENCE</h2>
        <hr />
        {c.experiences.map((e) => (
          <WorkExperience
            key={e.title}
            title={e.title}
            company={e.company}
            duration={e.duration}
            responsibilities={e.responsibilities}
          />
        ))}

        <Skills />

        <h2>PROJECTS</h2>
        <hr />
        {c.projects.map((e) => {
          return (
            <Projects
              key={e.name}
              name={e.name}
              url={e.url}
              contributions={e.contributions}
              description={e.description}
            />
          );
        })}
      </PrintLayout>
    </div>
  );
}

interface IWorkExperience {
  readonly title: string;
  readonly company: string;
  readonly duration: string;
  readonly responsibilities: string[];
}

function WorkExperience(props: IWorkExperience) {
  const { title, company, duration, responsibilities } = props;

  return (
    <div className="mb-1">
      <h2>{title}</h2>
      <div className="flex justify-between">
        <p className="italic">{company}</p>
        <p>{duration}</p>
      </div>
      <ul className="list-disc items-center">
        {responsibilities.map((e) => (
          <li className="ml-2" key={e}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Skills() {
  return (
    <>
      <h2>SKILLS</h2>
      <hr />

      <div className="flex">
        <Skill title="Language" data={c.skills.frontend.technologies} />

        <Skill title="Frameworks" data={c.skills.frontend.frameworks} />
      </div>

      <div className="mt-3 flex">
        <Skill title="Backend" data={c.skills.backend.technologies} />

        <Skill title="Tools" data={c.skills.database.tools} />
      </div>

      <div className="mt-3 flex">
        <Skill title="Database" data={c.skills.database.technologies} />
      </div>
    </>
  );
}

interface ISkills {
  readonly title: string;
  readonly data: string[];
}

function Skill({ data, title }: ISkills) {
  return (
    <div className="flex-1">
      <p className="underline">{title}:</p>
      <p>
        {' '}
        -{' '}
        {data.map((e, i) => {
          if (i + 1 != data.length) return `${e}, `;
          else return e;
        })}
      </p>
    </div>
  );
}

interface IProjects {
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly contributions: string[];
}

function Projects(props: IProjects) {
  const { name, url, description, contributions } = props;

  return (
    <div className="mb-2">
      {url && (
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="italic text-blue-700"
          >
            {name}
          </a>
          <ExternalLink size={15} />
        </div>
      )}
      <p>{description}</p>

      <ul className="list-disc items-center">
        {contributions.map((e) => (
          <li className="ml-2" key={e}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
