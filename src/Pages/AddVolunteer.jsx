import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //    Get Data Into Form
    const form = e.target;
    const postTitle = form.postTitle.value;
    const description = form.description.value;
    const category = form.category.value;
    const location = form.location.value;
    const volunteersNeeded = parseFloat(form.volunteersNeeded.value);
    const deadline = startDate;
    const thumbnailUrl = form.thumbnailUrl.value;
    const organizerName = user?.displayName;
    const organizerEmail = user?.email;

    const newPost = {
      postTitle,
      description,
      category,
      location,
      volunteersNeeded,
      thumbnailUrl,
      deadline,
      organizerName,
      organizerEmail,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/all-volunteers`,
        newPost
      );

      toast.success("Data Added Successfully");
      navigate("/all-volunteers");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-3 bg-white dark:bg-gray-800 rounded-lg ">
      <Helmet>
        <title>Add Volunteer Need Post</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
        Add Volunteer Need Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thumbnail URL */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Thumbnail URL
          </label>
          <input
            type="url"
            name="thumbnailUrl"
            placeholder="Enter Image URL"
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
            required
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Post Title
          </label>
          <input
            type="text"
            name="postTitle"
            required
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            required
            rows="4"
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            required
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          >
            <option value="">Select a Category</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Social Service">Social Service</option>
            <option value="Animal Welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            required
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Volunteers Needed */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            No. of Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            required
            min="1"
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Deadline
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mt-2 block w-full text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
            name="deadline"
            required
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Organizer Name
          </label>
          <input
            type="text"
            name="organizerName"
            value={user?.displayName}
            readOnly
            className="mt-2 block w-full text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Organizer Email */}
        <div>
          <label className="block text-lg font-medium text-gray-800 dark:text-gray-300">
            Organizer Email
          </label>
          <input
            type="email"
            name="organizerEmail"
            value={user?.email}
            readOnly
            className="mt-2 block w-full text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-3"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteer;
