import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import Spinner from "../Components/Spiner";
import { formatDate } from "date-fns";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hooks/useAxious";

const VolunteerDetails = () => {
  const useAxious = useAxiosSecure();
  const [volunteer, setVolunteer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await useAxious.get(
          `/volunteer-details/${id}/?email=${user?.email}`
        );
        setVolunteer(data);
        setLoading(false);
      } catch (error) {
        error && toast.error("Unauthorized Acces");
      }
    };
    fetchData();
  }, [id, useAxious, user?.email]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        {loading && <Spinner></Spinner>}
      </div>
    );
  }

  const {
    postTitle,
    description,
    deadline,
    location,
    organizerName,
    organizerEmail,
    volunteersNeeded,
    thumbnailUrl,
    category,
    _id,
  } = volunteer;

  const handleBeVolunteer = () => {
    if (volunteersNeeded === 0)
      return toast.error("No Volunteer Needed Right Now");
    document.getElementById("my_modal_4").showModal();
  };

  const handleVolunteerRequest = async (e) => {
    e.preventDefault();

    const form = e.target;
    const postTitle = form.postTitle.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteersNeeded = form.volunteersNeeded.value;
    const deadline = form.deadline.value;
    const thumbnailUrl = form.thumbnailUrl.value;
    const organizerName = form.organizerName.value;
    const organizerEmail = form.organizerEmail.value;
    const volunteerName = user?.displayName;
    const volunteerEmail = user?.email;

    const volunteerPostId = _id;

    const beVoluteerData = {
      postTitle,
      description,
      category,
      location,
      volunteersNeeded,
      thumbnailUrl,
      deadline,
      organizerName,
      organizerEmail,
      volunteerName,
      volunteerEmail,
      volunteerPostId,
      status: "Requested",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/requested-volunteer`,
        beVoluteerData
      );
      document.getElementById("my_modal_4").close();
      toast.success("Sent a Request For Be Volunteer");
      navigate("/all-volunteers");
    } catch (error) {
      document.getElementById("my_modal_4").close();
      toast.error(error?.response?.data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg mt-10">
      <Helmet>
        <title>Volunteer Details Page</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:space-x-12 items-center">
        <img
          src={thumbnailUrl}
          alt={postTitle}
          className="w-80 h-80 object-cover rounded-xl shadow-lg border-4 border-blue-300"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-900">{postTitle}</h1>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            {description}
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-center md:justify-start">
              <FaCalendarAlt className="text-blue-600 mr-3 text-xl" />
              <span className="text-gray-800 text-lg">
                <strong>Deadline:</strong> {formatDate(new Date(deadline), "P")}
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="text-red-500 mr-3 text-xl" />
              <span className="text-gray-800 text-lg">
                <strong>Location:</strong> {location}
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <FaUser className="text-green-600 mr-3 text-xl" />
              <span className="text-gray-800 text-lg">
                <strong>Volunteers Needed:</strong> {volunteersNeeded}
              </span>
            </div>
            <div className="text-gray-800 mt-6">
              <p className="text-lg">
                <strong>Organizer:</strong> {organizerName}
              </p>
              <p className="text-lg">
                <strong>Contact:</strong> {organizerEmail}
              </p>
            </div>
          </div>
          <button
            onClick={handleBeVolunteer}
            className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
          >
            Be a Volunteer
          </button>
        </div>
      </div>

      {/* modal */}
      <dialog
        id="my_modal_4"
        className="modal bg-opacity-80 dark:bg-gray-800 dark:text-white"
      >
        <div className="modal-box w-11/12 max-w-5xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Volunteer Request Form
          </h3>
          <form
            onSubmit={handleVolunteerRequest}
            method="dialog"
            className="space-y-6 mt-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Thumbnail
              </label>
              <input
                type="text"
                name="thumbnailUrl"
                value={thumbnailUrl}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Post Title
              </label>
              <input
                type="text"
                value={postTitle}
                name="postTitle"
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                name="description"
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={category}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={location}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Volunteers Needed
              </label>
              <input
                type="text"
                value={volunteersNeeded}
                name="volunteersNeeded"
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Deadline
              </label>
              <input
                name="deadline"
                type="text"
                value={deadline}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organizer
              </label>
              <input
                type="text"
                name="organizerName"
                value={organizerName}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organizer Email
              </label>
              <input
                type="text"
                name="organizerEmail"
                value={organizerEmail}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Volunteer Name
              </label>
              <input
                type="text"
                name="VolunteerName"
                value={user?.displayName}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Volunteer Email
              </label>
              <input
                type="text"
                name="VolunteerEmail"
                value={user?.email}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Suggestion
              </label>
              <textarea
                className="w-full border rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
                placeholder="Your suggestions here..."
              />
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Request
              </button>
            </div>
          </form>
          <div className="flex justify-end mt-2">
            <button
              className="btn btn-warning px-8 "
              onClick={() => document.getElementById("my_modal_4").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default VolunteerDetails;
