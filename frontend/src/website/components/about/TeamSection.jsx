import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";
import Container from "../../common/Container";

const team = [
  {
    name: "Adrian Stone",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=jpg&q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Karen Ryan",
    role: "Head Roaster",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "James Ferguson",
    role: "Lead Barista",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=80&w=500&auto=format&fit=crop",
  },
];

const socialLinks = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaXTwitter, href: "#", label: "Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaPinterestP, href: "#", label: "Pinterest" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TeamSection = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-coffee-dark">
            Behind The Brew
          </h2>
          <span className="block w-14 h-0.5 bg-coffee-accent mx-auto mt-4 sm:mt-5" />
          <p className="font-body text-sm sm:text-base text-coffee-dark/60 mt-5 sm:mt-6 leading-relaxed">
            A small, dedicated team who show up early, roast with care, and pour
            every cup like it's the only one that matters.
          </p>
        </div>

        {/* Team grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-7 max-w-4xl mx-auto"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group text-center"
            >
              {/* Image + hover overlay */}
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-coffee-cream">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Dark overlay — grows from center to full size on hover */}
                <div className="absolute inset-0 bg-coffee-dark/55 scale-0 group-hover:scale-100 origin-center transition-transform duration-500 ease-out" />

                {/* Social icons — fade + slide up on hover, slightly delayed so the overlay leads */}
                <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-150">
                  {socialLinks.map(({ Icon, href, label }, idx) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={`${member.name} on ${label}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ transitionDelay: `${idx * 60}ms` }}
                      className="w-10 h-10 sm:w-11 sm:h-11 bg-white flex items-center justify-center text-coffee-dark hover:bg-coffee-accent hover:text-white transition-colors duration-300"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              <h3 className="font-body text-base font-bold text-coffee-dark mt-5">
                {member.name}
              </h3>
              <p className="font-body text-sm text-coffee-accent mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default TeamSection;
