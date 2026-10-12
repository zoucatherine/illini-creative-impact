import alexZhangPortrait from '../assets/officer-portraits/alex-zhang.webp';
import ameliaCarpenterPortrait from '../assets/officer-portraits/amelia-carpenter.webp';
import josephWangPortrait from '../assets/officer-portraits/joseph-wang.webp';
import catherineZouPortrait from '../assets/officer-portraits/catherine-zou.webp';
import leilaZouPortrait from '../assets/officer-portraits/leila-zou.webp';
import jadenChenPortrait from '../assets/officer-portraits/jaden-chen.webp';
import alyanAjaniPortrait from '../assets/officer-portraits/alyan-ajani.webp';
import praiseShimPortrait from '../assets/officer-portraits/praise-shim.webp';
import christinaNasiosPortrait from '../assets/officer-portraits/christina-nasios.webp';
import mayumiCaisipPortrait from '../assets/officer-portraits/mayumi-caisip.webp';
import { site, joinHref, partnerHref } from '../content/site';
import { ButtonLink } from '../components/ui';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

const teams = [
  {
    name: 'Events',
    description: 'Plan and run our exhibitions, art contests, socials, and community events.',
  },
  {
    name: 'Fundraising',
    description: 'Raise the money that makes our projects and events possible.',
  },
  {
    name: 'Design & Artist Coordination',
    description: 'Handle design requests from partners and work with the artists in our events.',
  },
  {
    name: 'Marketing',
    description: 'Get the word out so the right people find our events and projects.',
  },
  {
    name: 'Showcase Planning',
    description: 'Put student work in front of an audience at our exhibitions and showcases.',
  },
];

const officers = [
  {
    branch: 'Executive Leadership',
    role: 'President',
    name: 'Alex Zhang',
    portrait: alexZhangPortrait,
    contacts: [
      ['alexzhang675@gmail.com', 'mailto:alexzhang675@gmail.com'],
      ['alexz10@illinois.edu', 'mailto:alexz10@illinois.edu'],
      ['408-898-8207', 'tel:4088988207'],
    ],
  },
  {
    branch: 'External Relations',
    role: 'VP External',
    name: 'Amelia Carpenter',
    portrait: ameliaCarpenterPortrait,
    contacts: [['acarp@illinois.edu', 'mailto:acarp@illinois.edu']],
  },
  {
    branch: 'External Relations',
    role: 'VP External',
    name: 'Joseph Wang',
    portrait: josephWangPortrait,
    contacts: [['josephwang87654321@gmail.com', 'mailto:josephwang87654321@gmail.com']],
  },
  {
    branch: 'Internal Operations',
    role: 'VP Internal',
    name: 'Catherine Zou',
    portrait: catherineZouPortrait,
    contacts: [
      ['czou@illinois.edu', 'mailto:czou@illinois.edu'],
      ['224-833-0140', 'tel:2248330140'],
    ],
  },
  {
    branch: 'Programming & Events',
    role: 'Events Team Leader',
    name: 'Leila Zou',
    portrait: leilaZouPortrait,
    contacts: [['leilayz2@illinois.edu', 'mailto:leilayz2@illinois.edu']],
  },
  {
    branch: 'Finance & Development',
    role: 'Fundraising Head',
    name: 'Jaden Chen',
    portrait: jadenChenPortrait,
    contacts: [
      ['qchen87@illinois.edu', 'mailto:qchen87@illinois.edu'],
      ['760-812-4548', 'tel:7608124548'],
    ],
  },
  {
    branch: 'Finance & Development',
    role: 'Treasurer',
    name: 'Alyan Ajani',
    portrait: alyanAjaniPortrait,
    contacts: [
      ['alyanaa2@illinois.edu', 'mailto:alyanaa2@illinois.edu'],
      ['312-833-0371', 'tel:3128330371'],
    ],
  },
  {
    branch: 'Creative Direction',
    role: 'Design Head & Artist Coord Leader',
    name: 'Praise Shim',
    portrait: praiseShimPortrait,
    contacts: [['praises2@illinois.edu', 'mailto:praises2@illinois.edu']],
  },
  {
    branch: 'Marketing & Communications',
    role: 'Marketing Team Leader',
    name: 'Christina Nasios',
    portrait: christinaNasiosPortrait,
    contacts: [['cnasi@illinois.edu', 'mailto:cnasi@illinois.edu']],
  },
  {
    branch: 'Marketing & Communications',
    role: 'Showcase Planning Team Leader',
    name: 'Mayumi Caisip',
    portrait: mayumiCaisipPortrait,
    contacts: [['mcaisip2@illinois.edu', 'mailto:mcaisip2@illinois.edu']],
  },
];

function OfficerCard({ officer }) {
  return (
    <article className="rounded-2xl border border-[#131E38]/10 bg-white p-6 shadow-lg shadow-[#131E38]/5">
      <img
        src={officer.portrait}
        alt={`${officer.name}, ${officer.role}`}
        className="mb-5 h-24 w-24 rounded-full border-2 border-illiniOrange/40 object-cover"
      />
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-orangeInk">{officer.role}</p>
      <h3 className="mt-2 font-editorial text-2xl font-bold text-[#131E38]">{officer.name}</h3>
      <div className="mt-4 flex flex-col gap-2 text-sm">
        {officer.contacts.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="break-words text-orangeInk transition-colors hover:text-[#131E38]"
          >
            {label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function AboutPage() {
  useDocumentMeta(
    'About',
    'Illini Creative Impact is a UIUC student organization that believes creativity can drive change in our communities. Meet our officers.',
  );
  const branches = [...new Set(officers.map((officer) => officer.branch))];

  return (
    <div className="bg-[#FDFBF7] text-[#131E38]">
      <PageHeader
        eyebrow="About ICI"
        title={
          <>
            Students who think creativity should <span className="italic text-illiniOrange">help someone.</span>
          </>
        }
        intro={site.belief}
      />

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="space-y-6 text-lg leading-8 text-slate-700 lg:col-span-7">
            <p>
              Illini Creative Impact is a student organization at the University of Illinois Urbana-Champaign. We
              look for places where students can be genuinely useful (a nonprofit that needs promotional materials, a
              campus that could use a better art event, a cause that deserves more attention) and then we do the work.
            </p>
            <p>
              Creativity, to us, isn’t limited to art. It’s problem solving, entrepreneurship, strategy, organizing,
              design, and communication. We’re not just a volunteering club, an art club, or a consulting club; we
              borrow from all three and keep the door open to anyone who wants to contribute.
            </p>
            <p>
              If you’re a business student looking for practical experience that matters, you’ll find it here. If
              you’re not, you’re just as welcome. Every major, no experience required.
            </p>
            <p className="text-base text-slate-500">Formerly the {site.formerName}.</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <ButtonLink href={joinHref}>Join ICI</ButtonLink>
            <ButtonLink href="/work" variant="secondary">See our work</ButtonLink>
            <ButtonLink href={partnerHref} variant="secondary">Partner with us</ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-[#131E38]/10 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-orangeInk">
              How we’re organized
            </p>
            <h2 className="font-editorial text-4xl font-extrabold italic tracking-tight sm:text-5xl">
              Teams that keep things <span className="text-orangeInk">moving.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Officers lead these teams, but members aren’t locked into one, so you can help wherever a project needs you.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <article key={team.name} className="rounded-2xl border border-[#131E38]/10 bg-white p-7 shadow-lg shadow-[#131E38]/5">
                <div className="mb-6 h-1 w-12 rounded-full bg-illiniOrange" />
                <h3 className="font-editorial text-2xl font-bold">{team.name}</h3>
                <p className="mt-4 leading-7 text-slate-700">{team.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="officers" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-orangeInk">
              Meet the officers
            </p>
            <h2 className="font-editorial text-4xl font-extrabold tracking-tight sm:text-5xl">
              The people behind the <span className="italic">work.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The student leaders who coordinate our projects, events, and partnerships. Reach out directly; we’re happy to talk.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {branches.map((branch) => (
              <div key={branch}>
                <h3 className="border-b border-[#131E38]/10 pb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#131E38]">
                  {branch}
                </h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {officers
                    .filter((officer) => officer.branch === branch)
                    .map((officer) => (
                      <OfficerCard key={`${officer.role}-${officer.name}`} officer={officer} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
