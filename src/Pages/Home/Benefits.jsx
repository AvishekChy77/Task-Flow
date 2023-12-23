import React from "react";

const Benefits = () => {
  return (
    <div>
      <section className="bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">
          Who Can Benefit from Our Platform?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Persona - Developer */}
          <div data-aos="zoom-in" className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Developer</h3>
            <p className="text-gray-700 mb-4">
              Boost your coding projects with organized task management and
              collaboration.
            </p>
            {/* Add an icon or illustration here */}
          </div>

          {/* User Persona - Corporate Professional */}
          <div data-aos="zoom-in" className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Corporate Professional</h3>
            <p className="text-gray-700 mb-4">
              Streamline your work tasks and improve team coordination
              seamlessly.
            </p>
            {/* Add an icon or illustration here */}
          </div>

          {/* User Persona - Banker */}
          <div data-aos="zoom-in" className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Banker</h3>
            <p className="text-gray-700 mb-4">
              Efficiently manage your banking tasks with our user-friendly
              platform.
            </p>
            {/* Add an icon or illustration here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
