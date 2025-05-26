import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaWhatsapp,
  FaSnapchatGhost,
  FaEnvelope,
  FaYoutube,
  FaInstagram,
  FaPhoneAlt,
  FaSave,
} from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className="p-6 bg-gray-100 absolute top-20 right-0 w-[80%] min-h-screen">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex-1">
          {/* Banner */}
          <div
            className="relative rounded-2xl overflow-hidden h-48 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://static.vecteezy.com/system/resources/thumbnails/040/890/255/small_2x/ai-generated-empty-wooden-table-on-the-natural-background-for-product-display-free-photo.jpg')",
            }}
          ></div>

          {/* Profile Image */}
          <div className="relative -mt-10 ml-5 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden">
            <img
              src="https://test-hcc.unitedlayer.com/wp-content/uploads/2020/01/dummy-profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name and Title */}
          <div className="mt-4 ml-5">
            <h2 className="text-xl font-bold text-gray-900">
              Kamran Shabir{" "}
              <span className="text-gray-500 text-sm">(Public)</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Business Owner At Transition
            </p>
          </div>

          {/* Bio */}
          <div className="mt-4 ml-5 text-sm text-gray-700 leading-relaxed">
            Kamran Shabir is the CEO of Transition Technologies Limited and a
            seasoned entrepreneur with extensive business expertise. With a
            proven track record of driving growth and innovation, he leads with
            a vision for excellence. Kamran is dedicated to delivering impactful
            solutions and fostering sustainable success.
          </div>

          {/* Action Buttons */}
          <div className="mt-4 ml-5 flex gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-700">
              <FaPhoneAlt className="text-green-500" /> Call
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-700">
              <FaWhatsapp className="text-green-500" /> WhatsApp
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-700">
              <FaSave className="text-blue-500" /> Save
            </button>
          </div>

          {/* Video Thumbnail */}
          <div className="mt-5 ml-5 rounded-xl overflow-hidden shadow-md w-[90%] max-w-md">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Video"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-blue-500 text-white p-2 rounded-full">
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Social Links */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-semibold mb-4 text-lg">Social Links</h3>
          <div className="space-y-3">
            {[
              { icon: FaFacebookF, label: "Facebook", color: "text-blue-600" },
              { icon: FaLinkedinIn, label: "LinkedIn", color: "text-blue-700" },
              { icon: FaGoogle, label: "Gmail", color: "text-red-500" },
              { icon: FaWhatsapp, label: "WhatsApp", color: "text-green-500" },
              {
                icon: FaSnapchatGhost,
                label: "Snapchat",
                color: "text-yellow-500",
              },
              { icon: FaEnvelope, label: "Email", color: "text-gray-600" },
              { icon: FaYoutube, label: "YouTube", color: "text-red-600" },
              { icon: FaInstagram, label: "Instagram", color: "text-pink-500" },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className="flex items-center justify-between w-full px-4 py-2 rounded-full border border-gray-300 text-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="flex items-center gap-2">
                  <Icon className={`${color}`} /> {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-10 text-center">
        <h2 className="text-lg font-semibold">
          Create Your Profile And Get Your Personalized KuickTag Today!
        </h2>
        <button className="mt-4 bg-black text-white px-6 py-2 rounded-full">
          Create My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
