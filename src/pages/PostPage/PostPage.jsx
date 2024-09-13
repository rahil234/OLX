import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomFooter } from "../../components/Footer";
import "./PostPage.css";
import {
  CategorySelect,
  StateSelect,
  CitySelect,
  PlaceSelect,
} from "./Selectors";
import { db, storage, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const data = {
  states: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ],
  cities: {
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Kollam",
      "Malappuram",
      "Palakkad",
      "Thrissur",
      "Kannur",
      "Wayanad",
      "Alappuzha",
      "Idukki",
      "Pathanamthitta",
      "Kasargod",
      "Changanassery",
      "Kottayam",
      "Munnar",
      "Vypin",
    ],
    // Add other states with corresponding cities here
  },
  places: {
    Kochi: [
      "Calicut City",
      "Cheranalloor",
      "Edapally",
      "Fort Kochi",
      "MG Road",
      "Kaloor",
      "Kakkanad",
      "Palarivattom",
      "Vyttila",
      "Panampilly Nagar",
    ],
    Thiruvananthapuram: [
      "Attingal",
      "Nedumangad",
      "Vattiyoorkavu",
      "Kowdiar",
      "Pettah",
      "Karamana",
      "Poojappura",
      "Kazhakkoottam",
      "Sreekariyam",
    ],
    Kozhikode: [
      "Calicut City",
      "Chevayur",
      "West Hill",
      "Kuttikal",
      "Mukkam",
      "Kozhikode",
      "Nadakkavu",
      "Balussery",
      "Kunnamangalam",
      "Iringal",
    ],
    // Add other cities with corresponding places here
  },
};

function PostPage() {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [user,setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    state: "",
    city: "",
    place: "",
  });

  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    price: null,
    category: "",
  });

  const [formError, setFormError] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    userId: "",
    images: "",
  });

  const handleInputChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert file list to an array
    const newImages = [];
    const progressArray = [];

    files.forEach((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`); // Create a storage reference
      const uploadTask = uploadBytesResumable(storageRef, file); // Upload file

      // Monitor the progress of each file upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressArray[index] = progress;

          setUploadProgress([...progressArray]); // Update progress state
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          // Get download URL after the upload completes
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            newImages.push(downloadURL); // Store download URL
            setImages((prevImages) => [...prevImages, downloadURL]); // Add image URLs to state
          });
        }
      );
    });
  };

  const handleSubmit = async () => {
    try {
      if (user) {
        const uid = user.uid;
        let hasError = false;
        if (formDetails.title.trim().length < 1) {
          setFormError((prevError) => ({
            ...prevError,
            title: "Title is required",
          }));
          hasError = true;
        } else if (formDetails.title.trim().length < 4) {
          setFormError((prevError) => ({
            ...prevError,
            title: "Minimum of 4 characters is required",
          }));
          hasError = true;
        } else {
          setFormError((prevError) => ({ ...prevError, title: "" }));
        }

        // Description validation
        if (formDetails.description.trim().length < 1) {
          setFormError((prevError) => ({
            ...prevError,
            description: "Description is required",
          }));
          hasError = true;
        } else if (formDetails.description.trim().length < 8) {
          setFormError((prevError) => ({
            ...prevError,
            description: "Minimum of 8 characters is required",
          }));
          hasError = true;
        } else {
          setFormError((prevError) => ({ ...prevError, description: "" }));
        }

        // Price validation
        if (
          !formDetails.price ||
          isNaN(formDetails.price) ||
          Number(formDetails.price) <= 0
        ) {
          setFormError((prevError) => ({
            ...prevError,
            price: "Valid price is required",
          }));
          hasError = true;
        } else {
          setFormError((prevError) => ({ ...prevError, price: "" }));
        }

        // Category validation
        // if (formDetails.category.length < 1) {
        //   setFormError((prevError) => ({
        //     ...prevError,
        //     category: "Category is required",
        //   }));
        //   hasError = true;
        // } else {
        //   setFormError((prevError) => ({ ...prevError, category: "" }));
        // }

        // Location validation
        if (!location.state || !location.city || !location.place) {
          setFormError((prevError) => ({
            ...prevError,
            location: "Complete location is required",
          }));
          hasError = true;
        } else {
          setFormError((prevError) => ({ ...prevError, location: "" }));
        }

        // Check if there are any errors
        if (hasError) {
          return;
        }

        // Add the post to Firestore
        await addDoc(collection(db, "products"), {
          title: formDetails.title,
          description: formDetails.description,
          price: Number(formDetails.price),
          category: formDetails.category,
          location,
          userId: uid,
          images,
        });

        alert("Post added successfully!");
        navigate("/");
      } else {
        alert("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="post-page">
      <nav
        className="bg-[#F7F8F9] p-5"
        style={{
          boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          onClick={() => {
            history.back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </nav>

      <div className="min-h-screen max-w-[1280px] mx-auto">
        <h1 className="text-center text-2xl font-bold mt-4">POST YOUR AD</h1>
        <div className="post-section border rounded">
          <div className="option">
            {formError.category.length>0&&<p className="text-red-500">{formError.category}</p>}
            <h2>SELECT CATEGORY</h2>
            <div>
              <label htmlFor="">Category</label> <br />
              <CategorySelect />
            </div>
          </div>
          <hr />

          {/* option details*/}
          <div className="option">
            <h2>INCLUDE SOME DETAILS</h2>
            <div>
              {formError.title.length > 0 && (
                <p className="text-red-500">{formError.title}</p>
              )}
              <label htmlFor="">Ad title *</label> <br />
              <input
                type="text"
                name="title"
                id="title"
                className="border-4  rounded"
                onChange={handleInputChange}
              />
              <p className="text-xs text-gray-600">
                Mention the key features of your item (e.g. brand, model, age,
                type)
              </p>
            </div>
            <div>
              {formError.description.length > 0 && (
                <p className="text-red-500">{formError.description}</p>
              )}
              <label htmlFor="">Description *</label> <br />
              <textarea
                name="description"
                id="description"
                className="border-4 rounded"
                onChange={handleInputChange}
              ></textarea>
              <p className="text-xs text-gray-600">
                Include condition, features and reason for selling
              </p>
            </div>
          </div>
          <hr />

          {/* option Price selecrt */}
          <div className="option">
            <div>
              {formError.price.length > 0 && (
                <p className="text-red-500">{formError.price}</p>
              )}
              <h2>SET A PRICE</h2>
              <div>
                <label htmlFor="">Price *</label> <br />
                <input
                  type="text"
                  name="price"
                  className="rounded"
                  autoComplete="false"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <hr />

          {/* Option Photos */}
          <div className="option">
            <h2>UPLOAD UP TO 12 PHOTOS</h2>
            <div className="">
              <div className="border w-fit flex flex-col justify-center items-center p-2">
                <label htmlFor="imageUpload">
                  <button
                    type="button"
                    role="button"
                    tabIndex="0"
                    title="Add Photos"
                    className="cursor-pointer"
                  >
                    <svg
                      width="36px"
                      height="36px"
                      viewBox="0 0 1024 1024"
                      fillRule="evenodd"
                    >
                      <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                    </svg>
                  </button>
                  <span>Add photo</span>
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  multiple
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Display selected images */}
            <div className="image-preview flex mt-4 space-x-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>

            {/* Display upload progress */}
            <div className="upload-progress mt-4">
              {uploadProgress.map((progress, index) => (
                <div key={index} className="mt-2">
                  <p>
                    Image {index + 1}: {Math.round(progress)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
          <hr />

          {/* option place selector */}
          <div className="option">
            {formError.location.length > 0 && (
              <p className="text-red-500">{formError.location}</p>
            )}
            <h2>CONFORM YOUR LOCATION</h2>
            <div>
              <label htmlFor="">State *</label> <br />
              <StateSelect states={data.states} setLocation={setLocation} />
              <br />
            </div>
            {location.state && (
              <div>
                <label htmlFor="">City *</label> <br />
                <CitySelect
                  cities={data.cities}
                  state={location.state}
                  setLocation={setLocation}
                />
              </div>
            )}
            {location.city && (
              <div>
                <label htmlFor="">Place *</label> <br />
                <PlaceSelect
                  places={data.places}
                  city={location.city}
                  setLocation={setLocation}
                />
              </div>
            )}
          </div>
          <hr />

          {/* option details*/}
          <div className="option">
            <h2>REVIEW YOUR DETAILS</h2>
            <div className="flex">
              <figure
                className="relative overflow-hidden rounded-full me-4"
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundImage:
                    'url("https://statics.olx.in/external/base/img/avatar_2.png")',
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute bg-gray-800 bg-opacity-50 w-full bottom-0 flex justify-center fill-white p-[5px]">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 1024 1024"
                    data-aut-id="icon"
                    fillRule="evenodd"
                  >
                    <path d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"></path>
                  </svg>
                </div>
              </figure>
              <div className="flex-grow">
                <label htmlFor="">Email</label> <br />
                <input
                  type="text"
                  defaultValue={user.email}
                  className="border rounded w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <hr className="" />

          {/* option post */}
          <div className="option">
            <button
              className="bg-[#002f34] rounded-md p-3"
              onClick={handleSubmit}
            >
              <span className="font-bold text-white">Post Now</span>
            </button>
          </div>
        </div>
      </div>
      <BottomFooter />
    </div>
  );
}

export default PostPage;
