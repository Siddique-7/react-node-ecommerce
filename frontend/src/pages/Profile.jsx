import { useEffect, useState } from "react";
import useAuth from "../context/AuthContext";
import authAPI from "../services/authAPI";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, loadUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  // Load user into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        postalCode: user.address?.postalCode || "",
        country: user.address?.country || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authAPI.updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        }
      });

      await loadUser(); // refresh context
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      toast.success("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* Personal Info */}
      <form
        onSubmit={handleProfileUpdate}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded-md"
        />

        <input
          type="email"
          value={user.email}
          disabled
          className="w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded-md"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-2 rounded-md"
          />
        </div>

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Password Section */}
      <form
        onSubmit={handlePasswordUpdate}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          placeholder="Current Password"
          className="w-full border p-2 rounded-md"
        />

        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          placeholder="New Password"
          className="w-full border p-2 rounded-md"
        />

        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          placeholder="Confirm New Password"
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default Profile;