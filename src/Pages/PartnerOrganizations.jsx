const PartnerOrganizations = () => {
  const partners = [
    {
      id: 1,
      name: "Community Helpers",
      logo: "https://i.ibb.co.com/6XNfn1K/1.jpg",
      link: "https://communityhelpers.org",
    },
    {
      id: 2,
      name: "Green Earth Initiative",
      logo: "https://i.ibb.co.com/TKSCTJN/2.jpg",
      link: "https://greenearth.org",
    },
    {
      id: 3,
      name: "Local Youth Mentors",
      logo: "https://i.ibb.co.com/fx0sG3m/3.png",
      link: "https://localyouthmentors.org",
    },
    {
      id: 4,
      name: "Animal Shelter Network",
      logo: "https://i.ibb.co.com/PQykp18/4.jpg",
      link: "https://animalshelternetwork.org",
    },
    {
      id: 5,
      name: "Homeless Outreach",
      logo: "https://i.ibb.co.com/RCHkTZ5/5.jpg",
      link: "https://homelessoutreach.org",
    },
    {
      id: 6,
      name: "Youth Education Foundation",
      logo: "https://i.ibb.co.com/RzsQhRF/6.jpg",
      link: "https://youtheducationfoundation.org",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">
          Our Partner Organizations
        </h2>
        <p className="text-lg sm:text-xl mb-12">
          We are proud to collaborate with these amazing organizations to make a
          difference.
        </p>

        {/* Partner Organizations Grid */}
        <div className=" w-11/12 mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-40 object-contain mx-auto"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Become a Partner
          </h2>
          <p className="text-lg text-white mb-8">
            Interested in collaborating? Join us in our mission to make a
            lasting impact.
          </p>
          <a className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerOrganizations;